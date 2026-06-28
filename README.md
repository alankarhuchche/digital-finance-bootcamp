# Digital Finance Bootcamp — Phase 2A Scaffold

Interactive crash-course on digital finance/digital assets, built for newcomers
to a bank's digital assets lab. This is the **Phase 2A** deliverable: project
structure, local dev loop, and a working frontend ↔ backend ↔ Firestore round trip.
No real content modules or visualizations yet — that's Phase 2B/2C.

## Structure

```
digital-finance-bootcamp/
├── frontend/          Vite + TypeScript (no framework)
│   ├── src/main.ts    App entry — currently just proves the /api/visits round trip
│   └── vite.config.ts Dev-time proxy to the backend on :8080
├── backend/           Quarkus 3.27.x LTS
│   ├── pom.xml
│   ├── src/main/java/com/dfl/bootcamp/VisitResource.java   GET/POST /api/visits
│   ├── src/main/resources/application.properties
│   └── Dockerfile     Multi-stage: builds frontend, embeds it, builds Quarkus
└── .dockerignore
```

Single deployable: Quarkus serves the Vite production build as static resources
*and* exposes the `/api/visits` endpoint from the same container — one Cloud Run
service, not two.

## Local development

Two terminals, frontend and backend run separately in dev mode:

**Backend** (needs a GCP project with Firestore enabled, or point at the Firestore
emulator — see note below):
```bash
cd backend
export GCP_PROJECT_ID=your-gcp-project-id
./mvnw quarkus:dev
```

**Frontend**:
```bash
cd frontend
npm install
npm run dev
```

Open the Vite dev URL (typically `http://localhost:5173`). It proxies `/api/*`
calls to the Quarkus backend on `:8080` — no CORS config needed in dev or prod,
since they're the same origin in production anyway.

> **Firestore in local dev**: either point `GCP_PROJECT_ID` at a real project
> (cheapest path, Firestore's free tier covers this easily) or run the Firestore
> emulator locally if you'd rather not touch real cloud resources while developing.
> Phase 2D will document the emulator setup if you want it — flag it if so.

## Building the Docker image

The Dockerfile expects to be built **from the repo root**, not from `backend/`,
because it needs access to both `frontend/` and `backend/` in its build context:

```bash
docker build -f backend/Dockerfile -t digital-finance-bootcamp .
docker run -p 8080:8080 -e GCP_PROJECT_ID=your-gcp-project-id digital-finance-bootcamp
```

Full Cloud Run deployment steps (Artifact Registry, IAM, `gcloud run deploy`)
land in Phase 2F as a complete runbook — this scaffold is local-dev only for now.

## What's intentionally not here yet

- No content modules, no visualizations (Phase 2B/2C)
- No progress tracking (Phase 2E)
- No Cloud Run deployment scripts (Phase 2F)
- Visit counter is genuinely just a counter — no session data, no identifying
  information, by design (see planning discussion)
