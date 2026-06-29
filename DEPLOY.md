# Deployment Runbook — Digital Finance Bootcamp on Cloud Run

**Honest caveat before you start**: this runbook was written without being
able to actually run `docker`, `mvn`, or `gcloud` in the environment that
produced it — none of those tools were available there. Every command below
is written carefully against documented syntax, but **this is the first real
test of the backend build and the deployment path**. If something errors,
copy the exact output back and it can be debugged from there — better to
find issues now than guess blindly in advance.

---

## 0. Prerequisites

- A GCP project, with billing enabled (Cloud Run, Artifact Registry, and
  Firestore all have free tiers generous enough that a low-traffic personal
  project should cost close to nothing — but billing must still be *enabled*
  to use them)
- `gcloud` CLI installed and authenticated (`gcloud auth login`)
- Docker installed and running locally
- The Gmail App Password from Phase 2C's contact form setup
  (`myaccount.google.com/apppasswords`)

Set these once, used throughout:

```bash
export PROJECT_ID="your-gcp-project-id"
export REGION="europe-west2"   # London — lowest latency from the UK; change if you'd rather pick another
export REPO_NAME="digital-finance-bootcamp"
export SERVICE_NAME="digital-finance-bootcamp"

gcloud config set project "$PROJECT_ID"
```

---

## 1. Enable the required APIs

```bash
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  firestore.googleapis.com \
  secretmanager.googleapis.com
```

---

## 2. Create the Firestore database

The visit counter needs a Firestore database in **Native mode** (not
Datastore mode — they're different products under one name). If this
project has never used Firestore before:

```bash
gcloud firestore databases create --location="$REGION" --type=firestore-native
```

If a database already exists for this project, this step is a no-op (you'll
get an error saying one already exists — that's fine, skip ahead).

---

## 3. Store the Gmail App Password in Secret Manager

Don't pass this as a plain environment variable — it's the one genuinely
sensitive credential in this whole app.

```bash
echo -n "your-16-character-app-password" | \
  gcloud secrets create mailer-password --data-file=-
```

If you ever need to rotate it later:

```bash
echo -n "your-new-app-password" | \
  gcloud secrets versions add mailer-password --data-file=-
```

---

## 3b. Store the Gemini API key in Secret Manager

If not already done:

```bash
echo -n "your-gemini-api-key" | \
  gcloud secrets create gemini-api-key --data-file=-
```

The Cloud Run deploy command (step 7) references this as
`--set-secrets="GEMINI_API_KEY=gemini-api-key:latest"`.

---

## 4. Create an Artifact Registry repository

This is where the built Docker image actually lives.

```bash
gcloud artifacts repositories create "$REPO_NAME" \
  --repository-format=docker \
  --location="$REGION" \
  --description="Digital Finance Bootcamp container images"
```

Authenticate Docker to push there:

```bash
gcloud auth configure-docker "${REGION}-docker.pkg.dev"
```

---

## 5. Build the image

**Run this from the repo root** — the Dockerfile needs both `frontend/` and
`backend/` in its build context, which only works if Docker's build context
is the top-level folder:

```bash
cd digital-finance-bootcamp

export IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${SERVICE_NAME}:latest"

docker build -f backend/Dockerfile -t "$IMAGE" .
```

This runs all three Dockerfile stages: Vite builds the frontend, Maven
builds the Quarkus backend with that frontend embedded as static resources,
then a slim JRE image is produced for runtime. **This is the actual first
test of whether the backend compiles at all** — if `mvn package` fails
inside this build, the error will show here. Common things to check if it
does:

- Quarkus BOM version in `pom.xml` (`quarkus.platform.version`) — pinned to
  `3.27.1`; if that exact patch version doesn't exist by the time you build,
  bump it to whatever the current 3.27.x patch is
- Quarkiverse Google Cloud Services BOM version
  (`quarkus.google-cloud-services.version`) — same idea, check
  [the releases page](https://github.com/quarkiverse/quarkus-google-cloud-services/releases)
  if the pinned version is stale

## 6. Push it

```bash
docker push "$IMAGE"
```

---

## 7. Deploy to Cloud Run

```bash
gcloud run deploy "$SERVICE_NAME" \
  --image="$IMAGE" \
  --region="$REGION" \
  --platform=managed \
  --allow-unauthenticated \
  --min-instances=0 \
  --max-instances=2 \
  --memory=512Mi \
  --set-env-vars="GCP_PROJECT_ID=${PROJECT_ID},MAILER_USERNAME=your-gmail@gmail.com" \
  --set-secrets="MAILER_PASSWORD=mailer-password:latest,GEMINI_API_KEY=gemini-api-key:latest"
```

Notes on the flags:
- `--allow-unauthenticated` — this is a public bootcamp site, so it needs to
  be reachable without a Google login
- `--min-instances=0` — scale to zero when nobody's visiting, which is the
  entire cost-saving point of Cloud Run for a low-traffic personal project
- `--max-instances=2` — a cheap safety cap so a traffic spike (or an abuse
  attempt) can't silently run up an unbounded bill
- `--set-secrets` — pulls the Gmail App Password from Secret Manager at
  runtime rather than baking it into an env var anyone with read access to
  the service config could see

If the deploy succeeds, `gcloud` prints a **Service URL** — that's the live
site.

> **Port note**: Cloud Run defaults to routing traffic to port 8080 unless
> you pass `--port` to override it. The Dockerfile hardcodes
> `QUARKUS_HTTP_PORT=8080` to match that default. If you ever add `--port`
> with a different value, also add `QUARKUS_HTTP_PORT=<that value>` to
> `--set-env-vars` so they stay in sync — otherwise Cloud Run will route to
> a port Quarkus isn't actually listening on, and the service will look
> broken even though it deployed successfully.

---

## 8. Grant Cloud Run access to Firestore

The Cloud Run service runs as a service account, and that account needs
permission to read/write Firestore for the visit counter to work.

**Simplest path**: by default, Cloud Run uses the project's default compute
service account, which often already has broad Editor-level access in a
personal project — if so, this step is already satisfied and the counter
will just work.

**More correct path** (recommended once this is more than a quick test):
create a dedicated, narrowly-scoped service account instead of relying on
the broad default:

```bash
gcloud iam service-accounts create dfl-bootcamp-runner \
  --display-name="Digital Finance Bootcamp Cloud Run runner"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:dfl-bootcamp-runner@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/datastore.user"

gcloud run services update "$SERVICE_NAME" \
  --region="$REGION" \
  --service-account="dfl-bootcamp-runner@${PROJECT_ID}.iam.gserviceaccount.com"
```

`roles/datastore.user` is enough for Firestore read/write — nothing broader
is needed for what this app does.

---

## 9. Verify it actually works

Visit the Service URL from step 7 and check, in order:

1. **The module index loads** and lists all 18 modules
2. **The visit counter increments** — refresh the page a couple of times,
   the number should go up (confirms Firestore access is actually working,
   not just that the page renders)
3. **Open a module, tap "Mark module complete," go back** — the progress
   bar should move (this is pure `localStorage`, so it'll work even if
   Firestore is misconfigured — a failing counter doesn't mean progress
   tracking is broken too, they're independent)
4. **Submit the contact form** with a real email of your own as the
   "reply-to" field, and check that the email actually arrives at
   `alankarhuchche@gmail.com` — this is the one part of the whole app that
   depends on a third-party credential (the Gmail App Password) working
   correctly end to end

If the counter shows "unavailable" specifically, that's almost always
either the Firestore database not existing yet (step 2) or the service
account lacking `datastore.user` (step 8) — check those two first.

---

## 10. Optional: a custom domain

If you want this at something nicer than the auto-generated
`*.run.app` URL:

```bash
gcloud run domain-mappings create \
  --service="$SERVICE_NAME" \
  --domain="your-domain.com" \
  --region="$REGION"
```

This will output DNS records to add at your domain registrar. Propagation
and SSL certificate provisioning can take anywhere from a few minutes to a
few hours.

---

## What's deliberately not in this runbook

- **CI/CD** (Cloud Build triggers on a git push) — not set up; every deploy
  above is manual. Worth adding later if iterating frequently, not needed
  for an initial deploy.
- **Cloud SQL/Postgres** — not used anywhere; the counter is Firestore-only,
  per the cost decision made during planning.
- **The deferred Gemini chat layer** — still shelved; nothing here assumes
  it exists.

## If something goes wrong

Bring back the **exact** error output, not a paraphrase — Quarkus, Maven,
and `gcloud` errors are usually specific enough to diagnose precisely from
the real text, and a summary often strips out the detail that matters.
