# SWIFT Gateway Visual — Redesign Proposal

Date: 2026-07-07  
Status: Proposal — not yet approved for implementation  
Author: AI session (Phase 7 correction trigger)

---

## 1. Diagnosis

### What the current visual does

The current `swiftGatewayVisual.ts` is a **chip board**. The layout shows seven fixed zone boxes — Entry points, SWIFT secure boundary, SWIFT control fabric, Routing brain, Bank destinations, Status and evidence, Outside SWIFT — arranged in a 3-column grid. Role selection highlights or mutes chips within those zones using CSS class toggles (`sgv-chip--primary`, `sgv-chip--context`, `sgv-zone--path-active`, `sgv-zone--muted`).

This is a valid pattern for showing *what is present* in a role. It is the wrong pattern for showing *how a message moves through the estate in that role*.

### Why it does not tell the route-map story

**Problem 1: No directed path.** The zones are always in the same positions. There is no visual representation of a route — no track line, no directional flow, no sense that a message enters from the left, passes through controls, takes a specific service path, and arrives at a destination on the right. Every role looks structurally identical. Only the coloured chips change.

**Problem 2: Zones are equal-weight boxes.** The boundary zone, the control fabric, the routing brain and the destinations are all the same visual weight. In Role 1 (secure access), the boundary is the story. In Role 4 (controls), the fabric is the story. In Role 2 (scheme connector), the service path is the story. The current layout cannot make any of these structurally dominant.

**Problem 3: Scheme and service connectivity is invisible.** For Role 2, the design intent is to show the SWIFT estate connecting to CHAPS, Bacs, TARGET, SEPA, CLS, CREST as examples of scheme and market-infrastructure connectivity. These should appear as accessible, named service paths — not chips inside a generic "Routing brain" box. The current visual cannot show the distinction between scheme connectivity (Role 2), message routing (Role 3) and controls orchestration (Role 4). They all look like the same chip board with different chips lit.

**Problem 4: Settlement location is ambiguous.** The settlement zone appears as the last box in the lower row. Its structural separation from SWIFT is accurate — it has a dashed border — but it is visually adjacent to the evidence zone in a way that suggests a sequential step rather than a structural boundary. The route-map grammar (where settlement is a terminal at the end of a rail that is physically separate from the SWIFT map) communicates this much more cleanly.

**Problem 5: No choreography tells the story.** The BRM visual has a 6-step choreography (sources → gates → route decision → rail shimmer → settlement terminal lock → evidence cascade) where each step teaches a concept. The SWIFT visual has a single loop that lights chips with 110ms stagger per zone step. The animation sequence does not correspond to a conceptual sequence.

### Why the homepage route-map is better

The `bankRouteMap.ts` visual uses a **directed-route grammar**:

- **Sources (channels)** on the left as rounded ovals — muted until a scenario activates them
- **Control gate-band** as a stacked column — border-left lines activate red to signal "controls applied"
- **Route decision core** as a bordered amber box — activates with a one-shot pulse glow
- **Rail lanes** as horizontal tracks with a visual "wire" running from core to terminal — the track itself carries maturity styling (solid/ticked/dashed/dotted)
- **Settlement terminals** at the end of each rail — activate with a lock-flash to signal finality
- **Evidence ledgers** on the far right — cascade in last
- **Settlement is at the END of the rail, after the rail has been traversed** — visually, the train has arrived at the station, which is outside the core

Each scenario switches the *active set* of nodes. The visual tells you not just what is present but what path was taken.

For SWIFT, the equivalent grammar would show: who enters → SWIFT boundary always applies → what role the estate plays (the "core") → which specific services or paths are active → which bank systems receive the message → what evidence is produced → what remains outside SWIFT.

---

## 2. Recommended visual structure

### Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Role selector: 01 · Channel  02 · Scheme  03 · Routing  …]        │
├────────────┬──────────────────┬──────────────────┬──────────────────┤
│  SOURCES   │  SWIFT ESTATE    │  SERVICE / PATH  │  DESTINATION     │
│            │                  │                  │                  │
│ Entry      │ ┌──Boundary────┐ │ ┌──────────────┐ │ Bank systems     │
│ channel(s) │ │ Auth         │ │ │ Service path │ │ ─────────────    │
│            │ │ Entitlement  │ │ │ Rail / track │ │ Payments         │
│  ○ Source  │ │ Signing      │ │ │ → terminal   │ │ Treasury         │
│  ○ Source  │ └──────────────┘ │ └──────────────┘ │ Trade finance    │
│            │                  │                  │                  │
│            │ ┌──Function────┐ │ (role-specific   │                  │
│            │ │ Role-specific│ │  service nodes)  │                  │
│            │ │ controls or  │ │                  │                  │
│            │ │ routing      │ │                  │                  │
│            │ └──────────────┘ │                  │                  │
└────────────┴──────────────────┴──────────────────┴──────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  STATUS AND EVIDENCE (below the route map, like BRM ledgers)        │
│  Audit  Archive  Route decision  ACK/NACK  gpi/UETR  Repair trail   │
└─────────────────────────────────────────────────────────────────────┘

╔══════════════════════════════════════════════════════════════════════╗
║  OUTSIDE SWIFT — SETTLEMENT AND ACCOUNTING TRUTH                     ║
║  (dashed border, structurally separate, never part of active route)  ║
║  RTGS  Nostro/vostro  Local clearing  Market infrastructure          ║
╚══════════════════════════════════════════════════════════════════════╝

┌────────────────────────────────────┐  ┌───────────────────────────┐
│  Caption (role description)        │  │  Role insight panel        │
│  "In this role, the SWIFT estate…" │  │  Role type:               │
│                                    │  │  What SWIFT provides:      │
│                                    │  │  What SWIFT does not do:   │
│                                    │  │  Control focus:            │
└────────────────────────────────────┘  └───────────────────────────┘
```

### Four-column map (BRM-equivalent)

| Column | Content | BRM equivalent |
|---|---|---|
| Sources | Entry channels / source types for this role | `brm-sources` |
| SWIFT estate | Boundary (always present) + role function | `brm-middle` (gate-band + core) |
| Service / path | Role-specific service nodes with track lines | `brm-rails-panel` |
| Destination | Bank backend systems | `brm-ledgers` (or new terminal column) |

The settlement zone moves **below and outside** the 4-column map — not as a fourth column inside the map.

### Zones vs. nodes

Replace the current zone-box model with a **node model**:

- **Source nodes** — rounded ovals, one per entry type, muted until active (≈ `brm-source`)
- **Boundary gates** — always-present gate items with left border (auth, entitlement, signing), always active in all roles but visually dominant in Role 1 and Role 5 (≈ `brm-gate` with permanent activation, with special highlight for Role 5)
- **Function core** — role-specific amber box showing what the estate is doing in this role (classify/transform/screen/orchestrate/archive) (≈ `brm-core`)
- **Service/path nodes** — horizontal track lanes for role-specific connectivity targets (scheme services for Role 2, message families for Role 3, control outcomes for Role 4) (≈ `brm-rail`)
- **Destination terminals** — muted or active bank backend systems at the end of the tracks (≈ `brm-rail-terminal`)
- **Evidence band** — horizontal row below the map; evidence nodes cascade in last (≈ `brm-ledgers`)
- **Settlement block** — outside the map, dashed border, no track line connecting to it

### Route path treatment

Each role defines a `RouteStep[]` array — the ordered list of node IDs to activate. The animation choreography runs left to right:

1. Source node(s) activate (synchronous)
2. Boundary gates illuminate (staggered, 150ms start)
3. Function core activates with one-shot pulse (400ms)
4. Service/path rails light with track shimmer (600ms)
5. Destination terminals lock (900ms)
6. Evidence nodes cascade (1100ms + 50ms per node)

For reduced motion: `applyFinalState()` synchronously, no delays.

### Role selector

Same pill-button row as BRM. No maturity pills (SWIFT does not carry a maturity designation here — the estate is operational). Role 6 button renders pending/disabled until implemented.

### How role selection changes the route

Each role has its own:
- `sources: string[]` — source node IDs that activate
- `functionChips: string[]` — labels in the core box (role-specific function description)
- `serviceNodes: ServiceNode[]` — the rail/track lanes (role-specific; empty rails muted)
- `destinationIds: string[]` — destination terminal IDs that activate
- `evidenceIds: string[]` — evidence node IDs that activate
- `caption: string`
- `insight: RoleInsight` — same fields as current insight panel

The visual makes role-switching obvious because:
- The service/path rails **change entirely** between roles (e.g., Role 2 shows scheme connectivity tracks; Role 3 shows message-family tracks; Role 4 shows control-outcome lanes)
- The function core **changes label** per role
- Sources change (Role 5 shows Contingency entry; Role 1 shows Corporate/FI)
- Destinations may be muted (Role 4 keeps destinations muted — controls role, not routing role)

### Evidence and settlement display

Evidence nodes appear as a horizontal band below the map, styled like `brm-ledger` nodes. They cascade in last to signal "evidence is the output, not the driver."

Settlement block appears **below and visually separated** from the evidence band — outside the SWIFT estate boundary. It should have:
- Dashed border, distinct background
- Explicit header: "Outside SWIFT — settlement and accounting truth"
- Settlement mechanism labels (RTGS, Nostro / vostro, Local clearing, Market infrastructure)
- No track line connecting to it from inside the map

---

## 3. Role-by-role storyboards

### Role 1 — Channel and secure access layer

| Dimension | Content |
|---|---|
| Source/entry | Corporate / FI · Secure web · API channel · SCORE / MA-CUG |
| SWIFT estate function | "Controlled access and message authentication" |
| Boundary | Auth · Entitlement · Signing — all three active, boundary visually dominant |
| Service/path | Single service path: "Controlled channel → SWIFT estate" (one active rail; no scheme variants) |
| Destination | Payments · Treasury (soft — not the teaching point of this role) |
| Evidence | ACK / NACK · Route decision · Audit |
| Outside SWIFT | RTGS · Nostro / vostro · Local clearing |
| Active route | Source → Boundary → Auth/entitle/sign → Route decision → Destination → Evidence |
| Muted alternatives | Scheme-connectivity paths muted; contingency chips muted; control fabric slim/muted |
| Teaching point | The boundary is the point. This role shows that access and authentication are the primary estate function. Settlement is downstream and separate. |
| Insight fields | Role type: Access layer / What SWIFT provides: Controlled connectivity and evidence / What SWIFT does not do: Liquidity management or settlement / Control focus: Authentication, entitlement, validation and routing |

---

### Role 2 — Scheme and market-infrastructure connector

| Dimension | Content |
|---|---|
| Source/entry | Scheme portal · API channel · SCORE / MA-CUG |
| SWIFT estate function | "Scheme and service connectivity via controlled messaging" |
| Boundary | Auth · Entitlement — active |
| Service/path | **Multiple scheme-connectivity rails** — each named, muted unless relevant to this role's scope: CHAPS · Bacs · TARGET services · SEPA-related · CLS · CREST. All rails **active** for Role 2 (the estate can carry traffic to all of them). Rail label note: "Messaging connectivity — not settlement." No track line runs to the settlement block. |
| Destination | Payments · Treasury |
| Evidence | Route decision · ACK / NACK · Audit |
| Outside SWIFT | Settlement terminal for each scheme is in the settlement block, **not** at the end of the rail. The rail ends at a "Connectivity boundary" terminal — labelled something like "Scheme interface" — not "Settlement." The settlement block below shows "Settlement depends on scheme, account structure or market infrastructure." |
| Active route | Source → Boundary → Scheme classification (service / BIC / membership) → Scheme-connectivity rail → Scheme interface → Evidence |
| Muted alternatives | Contingency path muted; transform/enrich muted; control repair muted |
| Teaching point | The SWIFT estate provides the *messaging connection* to schemes. Settlement of the underlying obligation depends on the scheme, not on SWIFT. The rail runs to a "Scheme interface" — not to settlement. |
| Insight fields | Role type: Scheme / infrastructure connectivity / What SWIFT provides: Controlled messaging, access and routing / What SWIFT does not do: Scheme settlement or finality / Control focus: Membership, service, message type and destination routing |

**Extra detail on Role 2 is in section 4 below.**

---

### Role 3 — Message-family routing and transformation

| Dimension | Content |
|---|---|
| Source/entry | API channel · Internal app / file channel |
| SWIFT estate function | "Message-family classification and transformation" |
| Boundary | Auth · Entitlement |
| Service/path | **Message-family rails** — MT 1xx · MT 2xx · MT 3xx · MT 5xx · MT 7xx · MT 9xx · ISO 20022 families (pacs · camt · pain · sese). Active rail(s) depend on what the scenario is routing. Function core shows: Classify · Transform / enrich · UETR · Service codes |
| Destination | Payments · Treasury · Trade finance · Securities (multiple active — routing role routes to many backends) |
| Evidence | Route decision · Audit · gpi / UETR (context) |
| Outside SWIFT | Settlement |
| Active route | Source → Boundary → Classify → Transform (if needed) → Message-family rail → Backend destination → Evidence |
| Muted alternatives | Scheme connectivity paths muted; contingency chips muted; repair/screen muted |
| Teaching point | Transformation preserves the meaning and obligation — it does not change the economic obligation or settlement instruction. The message family changes format, not settlement finality. |
| Insight fields | Role type: Message routing and transformation / What SWIFT provides: Classification, transformation and routing / What SWIFT does not do: Change the economic obligation / Control focus: Message family, format, service and backend owner |

---

### Role 4 — Controls, sanctions and repair orchestrator

| Dimension | Content |
|---|---|
| Source/entry | Corporate / FI · API channel |
| SWIFT estate function | "Control orchestration — validate, screen, repair, release" |
| Boundary | Auth · Entitlement |
| Service/path | **Control-outcome lanes** — not scheme or message-family rails, but disposition lanes: Hold · Release · Reject · Repair queue. These are the "rails" for this role — the path leads to a disposition state, not a backend destination yet. |
| Destination | **Muted** — the destination column is greyed out. This is intentional and is the clearest visual signal of the role: the controls role does not route to a destination; it routes to a disposition state. Destination activates only *after* controls clear (which happens in a downstream process, not shown here). |
| Evidence | ACK / NACK · Route decision · Audit · Archive · Repair trail |
| Outside SWIFT | Settlement |
| Active route | Source → Boundary → Validate → Screen (sanctions) → Repair if needed → Release/hold/reject decision → Evidence |
| Muted alternatives | Scheme-connectivity rails muted; message-family rails muted; destination muted |
| Teaching point | The estate orchestrates controls; it does not own every control. The ACK/NACK and gpi events describe message or tracking state — not settlement finality. The destination is muted because the controls role does not route to a destination directly — it routes to a disposition state. |
| Insight fields | Role type: Control orchestration / What SWIFT provides: Controlled message progression and evidence / What SWIFT does not do: Own every specialist control / Control focus: Validation, screening, repair and release state |

---

### Role 5 — Contingency entry route

| Dimension | Content |
|---|---|
| Source/entry | Contingency entry · Manual instruction · File / API fallback (context: Failed upstream channel · Workflow outage — muted to show what failed) |
| SWIFT estate function | "Controlled contingency intake — full boundary and controls apply" |
| Boundary | **Auth · Entitlement · Signing — all three primary**. Boundary section visually heaviest in this role. Deliberate: the teaching point is "the full boundary applies in contingency." |
| Service/path | **Control-mandate lane** — a single lane labelled "Approval required · Segregation of duties · Sanctions screening · Validate · Release / hold." This is not a scheme rail or message-family rail — it is a control mandate path showing that every contingency instruction must traverse these controls before proceeding. |
| Destination | Payments · Treasury (active — contingency entries do reach destinations, unlike Role 4) |
| Evidence | Audit · Archive · Route decision · Reconciliation evidence · Retention (all primary, signalling the elevated evidence burden). ACK / NACK as context only. |
| Outside SWIFT | Settlement and accounting truth |
| Active route | Contingency source → Full boundary (auth + entitlement + signing) → Approval + SOD + sanctions + validate + release → Service routing → Destination → Full evidence cascade |
| Muted alternatives | Normal channels muted (shows the contingency context); scheme paths muted; message-family paths muted |
| Teaching point | Contingency bypasses a failed upstream system — not the controls. The full boundary applies. The controls mandate is the longest path in any role, deliberately. The evidence trail is the heaviest in any role. |
| Insight fields | Role type: Controlled fallback entry / What SWIFT provides: Protected alternate entry and evidence / What SWIFT does not do: Bypass controls or settle money / Control focus: Approval, entitlement, segregation of duties and audit |

---

### Role 6 — Evidence, archive and reporting source

| Dimension | Content |
|---|---|
| Source/entry | All message types (inbound · outbound · raw messages) |
| SWIFT estate function | "Evidence surface — message store, repair history, routing decisions" |
| Boundary | Auth · Entitlement |
| Service/path | **Evidence retrieval lanes** — Archive search · Repair history · Routing decisions · Duplicate check outcomes · Sanctions/hold states. These are the "rails" for this role — internal evidence retrieval paths, not outgoing service connections. |
| Destination | **Muted** — the destination column is not relevant to this role's teaching point. |
| Evidence | All evidence nodes active: Raw messages · ACK/NACK history · Repair trail · gpi/UETR · Route decision · Audit · Archive · Sanctions states |
| Outside SWIFT | Settlement and accounting truth. **Prominent label**: "Raw message data must be reconciled with ledgers and settlement records — it is not accounting truth." |
| Active route | Message store → Evidence surface → Archive/reporting → (no outgoing route) → Evidence cascade |
| Muted alternatives | Service paths muted; destination muted; contingency muted |
| Teaching point | Raw SWIFT message data is evidence, not accounting truth or settlement truth. Reconciliation with ledgers and settlement records is required. |
| Insight fields | Role type: Evidence and reporting source / What SWIFT provides: Raw message evidence and archive / What SWIFT does not do: Provide accounting truth or settlement truth / Control focus: Evidence completeness, audit trail and reconciliation |

---

## 4. Role 2 storyboard — extra detail

### The problem to solve

Role 2 must make this claim visually: the SWIFT estate provides messaging connectivity to schemes such as CHAPS, Bacs, TARGET services, SEPA-related services, CLS and CREST. It must not imply SWIFT settles on behalf of these schemes. Settlement depends on the scheme, the account structure, or the relevant market infrastructure — outside SWIFT.

### Visual approach

**Rail labels for Role 2:**

Each scheme appears as a named connectivity rail in the service/path column:

```
Service / connectivity paths:
┌─────────────────────────────────────────────────┐
│ CHAPS ─────────────────────── Scheme interface  │ ← active
│ Bacs ──────────────────────── Scheme interface  │ ← active
│ TARGET services ───────────── Scheme interface  │ ← active
│ SEPA-related ──────────────── Scheme interface  │ ← active
│ CLS ───────────────────────── Scheme interface  │ ← active
│ CREST ─────────────────────── Scheme interface  │ ← active
└─────────────────────────────────────────────────┘
```

**Terminal label:** "Scheme interface" — not "Settlement." The terminal represents the messaging handoff point to the scheme's infrastructure, not the settlement event.

**Settlement block (below map, outside SWIFT):**

```
╔══════════════════════════════════════════════════════════════╗
║  OUTSIDE SWIFT — SETTLEMENT AND ACCOUNTING TRUTH              ║
║                                                               ║
║  Settlement depends on scheme, account structure or           ║
║  market infrastructure. RTGS · Nostro / vostro ·              ║
║  Local clearing · CLS net · CSD settlement                    ║
╚══════════════════════════════════════════════════════════════╝
```

**No track line** connects the "Scheme interface" terminals to the settlement block. The settlement block is visually separate — a box below the map with a dashed border, no incoming arrow.

**Caption for Role 2:**

> In this role, the SWIFT estate helps the bank connect to schemes, services or market infrastructures through controlled messaging and access arrangements. The estate classifies and routes messages by service, BIC, scheme, membership and backend ownership. SWIFT provides the messaging connection — settlement depends on the scheme, account structure or market infrastructure outside the SWIFT estate.

**Accuracy safeguards for Role 2:**

- Rail labels are scheme names, not settlement mechanisms (CHAPS is not labelled "RTGS settlement" — it is labelled "CHAPS")
- Terminal is "Scheme interface" not "Settlement terminal"
- Caption uses "depends on" language for settlement
- Insight field "What SWIFT does not do" = "Scheme settlement or finality"
- No BRM-style maturity pill on scheme rails — do not imply LIVE/MODERNISING for specific connectivity arrangements (these vary by bank, membership and NSP relationship)
- Note in rail head: "Examples of connectivity — not exhaustive" or small caption below the rail panel: "Access model and participant eligibility differ by scheme."

---

## 5. Implementation options

### Option A — Refactor current visual in place

**What changes:** Rewrite `swiftGatewayVisual.ts` entirely, keeping the file but replacing the zone-box model with a directed-route model. New CSS in `style.css` (a new `.srv-*` section, retiring most `.sgv-*` rules).

**Files likely changed:**
- `frontend/src/viz/swiftGatewayVisual.ts` (full rewrite — new layout, new data model, new animation choreography)
- `frontend/src/style.css` (replace SGV map CSS with new route-map CSS)

**Risk:** Medium. The component is a full rewrite — if any role's data model is wrong, the whole visual regresses. But the file interface (exported function + block kind registration) stays the same, so the rest of the app is unaffected.

**Effort:** High initial (design + implement new layout, choreography, data model). Lower per-role addition once the shell works.

**Preserves existing CSS/classes:** No — the zone-box CSS (`sgv-map`, `sgv-zone`, `sgv-chip`, etc.) is retired. The insight panel CSS can be reused.

**Phased:** Yes — build shell with Role 1 first, add roles one at a time, disable remaining.

---

### Option B — New route-map component (Recommended)

**What changes:** Create a new file `frontend/src/viz/swiftRoleMap.ts` using BRM grammar adapted for SWIFT. Create a new data file `frontend/src/data/swiftRoleMap.ts`. Register as a new block kind or replace the existing one. Keep `swiftGatewayVisual.ts` until the new component has parity, then delete it.

**Files likely changed:**
- `frontend/src/viz/swiftRoleMap.ts` (new file)
- `frontend/src/data/swiftRoleMap.ts` (new data file — separated from render logic)
- `frontend/src/style.css` (new `.srv-*` CSS section; BRM CSS reused where possible)
- `frontend/src/types.ts` (if adding new block kind `'swift-role-map'`)
- `frontend/src/content/render.ts` (add new block kind handler)
- `frontend/src/content/modules/25-swift-bank-gateway.ts` (switch block kind after parity)

**Risk:** Low for existing content — the old visual stays in place until the new one is ready. Parallel development. Switch is a one-line block kind change in the module file.

**Effort:** High initial (layout, CSS, data model, animation). Lower per role once shell is proven.

**Preserves existing CSS/classes:** Yes — BRM CSS patterns reused under `srv-` prefix. SGV CSS can be removed after cutover.

**Phased:** Yes — the cleanest phased approach:
1. Phase A: New component shell + data model + Role 1 only
2. Phase B: Roles 2 and 3
3. Phase C: Roles 4 and 5
4. Phase D: Role 6 + parity review
5. Phase E: Cutover (replace block kind in module file, delete old component)

---

### Option C — Hybrid: add a route spine to the current layout

**What changes:** Keep the current zone-box layout but add a visual "route spine" — a thin animated line (`position: absolute` or SVG) that traces the active path through the zone borders in sequence. The zones remain zone boxes; the spine provides directionality.

**Files likely changed:**
- `frontend/src/viz/swiftGatewayVisual.ts` (add spine rendering + animation)
- `frontend/src/style.css` (add spine CSS)

**Risk:** Low — least invasive, no structural change.

**Effort:** Medium. SVG path animation or CSS absolute positioning is non-trivial in a grid layout but achievable.

**Preserves existing CSS/classes:** Yes, fully.

**Phased:** Yes, but with a ceiling: the spine can add directionality but cannot fix the zone-equal-weight problem or make Role 2's scheme connectivity visible as distinct rails. The hybrid approach improves the current visual; it does not replace it with a route-map quality visual.

**Assessment:** Option C is the lowest risk but leaves the fundamental problem (no directed route, no role-specific path structure) unresolved. It buys time; it does not solve the design problem.

---

### Recommendation

**Option B.** Build a new `swiftRoleMap.ts` component alongside the existing visual. The BRM component demonstrates that the grammar works. The data separation (`bankRouteMap` data file) makes roles easy to add independently. The cutover is a one-line change in the module file when parity is reached.

The old SGV visual can be left running for Role 1 during development and deleted at cutover. There is no user-facing regression at any point.

---

## 6. Recommended implementation phases

All phases assume Option B (new component). No phase should be committed unless the full gate set passes for that phase.

### Phase A — New shell and Role 1 (Channel and secure access)

**Scope:**
- Create `frontend/src/data/swiftRoleMap.ts` with Role 1 data only
- Create `frontend/src/viz/swiftRoleMap.ts` with 4-column layout, BRM-equivalent grammar, Role 1 choreography
- Add `'swift-role-map'` block kind to `types.ts` and `render.ts`
- Add `{ kind: 'swift-role-map' }` block to module file **after** the existing `{ kind: 'swift-gateway-visual' }` — so both visuals render during development
- Add `srv-*` CSS section to `style.css`
- Role 2–6 disabled

**Gates:** All 8 quality gates (CONTENT_EVIDENCE_REVIEW first, as always).

**Acceptance:** Human can see Role 1 rendering as a directed-route map alongside the old chip-board visual. Both work. Human decides when to remove the old visual.

---

### Phase B — Roles 2 and 3

**Scope:**
- Add Role 2 data (scheme-connectivity rails with Scheme interface terminals, settlement block)
- Add Role 3 data (message-family rails)
- Verify settlement block appears correctly in both roles
- Role 2 accuracy check: scheme rail labels, terminal label, no settlement claim in rail or terminal

**Gates:** CONTENT_EVIDENCE_REVIEW · SWIFT_BANKING_ACCURACY_REVIEW · OVERCLAIMING_RISK_REVIEW · PREMIUM_VISUAL_REVIEW · INTEGRATION_STALENESS_REVIEW.

---

### Phase C — Roles 4 and 5

**Scope:**
- Add Role 4 data (control-outcome lanes, destination muted)
- Add Role 5 data (full boundary emphasis, control-mandate lane, full evidence cascade)
- Verify destination muting for Role 4
- Verify boundary prominence for Role 5
- Verify contingency controls appear as primary path nodes, not as chips

**Gates:** All 8 quality gates. SWIFT_BANKING_ACCURACY_REVIEW section 6 (contingency) mandatory.

---

### Phase D — Role 6

**Scope:**
- Add Role 6 data (evidence retrieval lanes, destination muted, settlement block with reconciliation note)
- Verify "raw message data ≠ accounting truth" messaging in caption and outside-SWIFT block

**Gates:** All 8 quality gates. SWIFT_BANKING_ACCURACY_REVIEW section 8 (message data) mandatory.

---

### Phase E — Cutover and retirement

**Scope:**
- Replace `{ kind: 'swift-gateway-visual' }` with `{ kind: 'swift-role-map' }` in module file
- Remove `{ kind: 'swift-gateway-visual' }` if both were present during development
- Delete `frontend/src/viz/swiftGatewayVisual.ts`
- Remove SGV CSS section from `style.css`
- Full end-to-end role switching test across all 6 roles
- Mobile strip implementation (vertical node strip for ≤767px, same as BRM)
- Set `ready: true` only after human sign-off

**Gates:** All 8 quality gates + INTEGRATION_STALENESS_REVIEW mandatory.

---

## 7. Accuracy risks

These must be checked at every phase by `SWIFT_BANKING_ACCURACY_REVIEW.md`.

### Settlement overclaim
- **Risk:** A rail that ends at a "Settlement" terminal implies SWIFT settles the payment.
- **Mitigation:** Terminals are labelled "Scheme interface" (Role 2), "Backend destination" (Roles 1/3/5) or "Disposition state" (Roles 4). Settlement block is always outside the map with no track line connecting to it.

### Scheme examples overclaim
- **Risk:** Listing CHAPS, Bacs, CLS etc. as scheme rails implies SWIFT settles via these schemes or that all banks have all of these connections.
- **Mitigation:** Rail panel carries a note: "Examples of connectivity — access model and participant eligibility differ by scheme." Caption states "Settlement depends on the scheme, account structure or market infrastructure." Terminal label: "Scheme interface" not "Settlement."

### ACK/NACK finality
- **Risk:** An ACK/NACK evidence node that activates alongside settlement implies ACK = settlement.
- **Mitigation:** ACK/NACK is always in the evidence band *below* the map, not in the settlement block. Caption for relevant roles states: "ACK / NACK confirms message processing status — not settlement."

### gpi/UETR overclaim
- **Risk:** gpi/UETR evidence node implies tracker status = finality.
- **Mitigation:** gpi/UETR appears as a context (not primary) evidence node. Role insight fields never imply finality from gpi.

### Contingency bypass controls
- **Risk:** A contingency path that skips the controls column implies controls are suspended.
- **Mitigation:** Role 5's control-mandate lane is the *longest* and *most prominent* path in the visual — more gates, not fewer. Caption states explicitly: "Controls apply — approval, entitlement, segregation of duties, sanctions, accounting, reconciliation, audit evidence and retention."

### Raw message data as accounting truth
- **Risk:** Role 6 evidence nodes imply the SWIFT archive is the source of truth.
- **Mitigation:** Settlement block for Role 6 carries explicit label: "Raw message data must be reconciled with ledgers and settlement records — it is not accounting truth." Caption reinforces.

### Liquidity management wording
- **Risk:** Role 1 or Role 2 connecting to "Cash / liquidity operations" as a destination implies SWIFT manages liquidity.
- **Mitigation:** The destination column is labelled "Bank destinations" not "Liquidity management." If the "Cash / liquidity operations" destination node is active, a tooltip or insight field note clarifies: "SWIFT provides the channel to access liquidity-related services; bank liquidity is managed through treasury operations."

---

## 8. Acceptance criteria

A human reviewer opening the redesigned visual should be able to, **without reading the surrounding page text**:

### Within 5 seconds:
- Identify which role is selected (active button, role caption)
- See a directed left-to-right path from source through SWIFT estate to destination
- See settlement as structurally outside SWIFT (visually separated block, dashed border, no connecting track)

### Within 30 seconds:
- Understand the structural difference between the roles by switching between them:
  - Role 1: boundary dominant, one clean access path
  - Role 2: multiple named scheme-connectivity rails, each ending at a "Scheme interface" not at settlement
  - Role 3: message-family rails, transformation core, multiple backend destinations
  - Role 4: control gates dominant, disposition lanes (not backend destinations), destination column muted
  - Role 5: boundary heaviest, controls mandate lane longest, full evidence cascade
  - Role 6: evidence band fully lit, all paths route to evidence, destination muted
- Say "SWIFT provides the messaging path — settlement happens outside" without being told

### Accuracy test (Role 2):
- A reader who looks at the scheme rails (CHAPS, Bacs, TARGET services, SEPA, CLS, CREST) and the settlement block should immediately understand: "SWIFT connects to these schemes for messaging — settlement of what happens through these schemes is a separate event, handled by the scheme itself or the relevant infrastructure, outside SWIFT."
- The reader should **not** be able to say "SWIFT settles CHAPS payments" based on anything they see in the visual.

### Comparison with BRM:
- The SWIFT role-map visual should feel like a sibling of the homepage route-map, not an inferior version of it.
- A reader who has seen the BRM visual should recognise the grammar immediately: sources on the left, controls in the centre, paths with tracks and terminals, evidence on the right, settlement at the edge.

---

## References

- Homepage route-map: `frontend/src/viz/bankRouteMap.ts`, `frontend/src/data/bankRouteMap.ts`
- Homepage route-map CSS: `frontend/src/style.css` lines ~1500–1890
- Current SWIFT visual: `frontend/src/viz/swiftGatewayVisual.ts`
- SWIFT visual CSS: `frontend/src/style.css` lines ~2212–2483
- Visual plan: `docs/visual-plans/swift-bank-gateway.md`
- Quality gates: `docs/quality-gates/PREMIUM_VISUAL_REVIEW.md`, `SWIFT_BANKING_ACCURACY_REVIEW.md`, `CONTENT_EVIDENCE_REVIEW.md`
- Phase 7 report (chip-board version): `docs/ai-runs/swift-gateway/phase-07-report.md`
