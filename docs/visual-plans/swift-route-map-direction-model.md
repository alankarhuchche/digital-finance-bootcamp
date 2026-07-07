# SWIFT Route-Map — Directional Model Correction Plan

Date: 2026-07-07
Status: Plan only — no source files changed
Scope: Pre-Role 3 correction of the SRM visual grammar

---

## 1. Diagnosis

### Where the current route-map is directionally misleading

The current four-column shell encodes a single direction: left to right.

```
Sources → SWIFT estate → Service path → Bank processing systems
```

The "Sources" column contains only external-facing entry points: Corporate / FI, Secure web, API channel, SCORE / MA-CUG, Scheme / service access. The "Bank processing systems" column sits on the far right as the terminal destination. Every role follows this left-to-right inbound grammar, regardless of whether that role is primarily inbound, outbound, or bidirectional.

This is conceptually wrong for at least two of the six roles, and the problem becomes a blocking issue from Role 3 onward:

**Role 1 (Channel and secure access):** The inbound direction is correct. An external FI or corporate connects to the bank through SWIFT. Sources on the left are external parties; bank systems on the right receive the message. The current layout works.

**Role 2 (Scheme connector):** The primary story is outbound. The bank connects its payment engine to CHAPS, Bacs, TARGET services, SEPA-related services, CLS, CREST through the SWIFT estate. The initiator is a bank internal system — not an external scheme. Yet the current implementation places "Scheme / service access" in the Sources column (left), as if the scheme is connecting to the bank inbound. Bank processing systems (Payments, Treasury) sit on the right as destinations. The visual reads as: scheme → SWIFT estate → bank. That is an inbound scheme receipt pattern. The role's actual primary story — bank connects outward to schemes — is invisible.

**Role 3 (Routing and transformation):** This role handles both inbound messages from external FIs and outbound messages from bank systems. A single inbound-only shell cannot model this without misleading the reader.

### Why "Bank processing systems" helped but did not fully solve it

Renaming "Bank destinations" to "Bank processing systems" was accurate and necessary. "Bank destinations" carried the false implication that these were final destination nodes for money — it sounded like a beneficiary bank or a settlement terminus. "Bank processing systems" correctly signals that these are internal processing entities, not settlement endpoints.

However, the label fix addressed terminology inside an already-incorrect structural position. The column is still on the far right as if it always receives messages from the left. For an outbound role, the bank's processing systems are the *source* — the initiator of the message. Putting them on the right as a destination while the "sources" column on the left shows external parties produces the opposite of the correct model for outbound flows.

The label was right. The column position and the role it plays in the grammar are the problem.

### Why continuing to Role 3 now would create conceptual debt

Role 3 is message-family routing and transformation. It is explicitly bidirectional: the SWIFT estate routes both inbound messages arriving from external FIs and outbound messages originating from bank internal systems. If the current inbound-only shell is used for Role 3, the implementation must choose which direction to represent. Whichever direction is chosen, the other half of the role's story is absent. That creates:

1. A visual that teaches half the pattern and implies it is the whole pattern.
2. Rail definitions and source/destination configurations that are semantically contradictory by the time Roles 4 and 5 are reached (Role 5 is contingency entry — the source is an internal operator or treasury system, not an external party at all).
3. A structural change requirement at Role 4 or Role 5 that will require reworking Role 3's data alongside the shell — creating three-phase technical debt instead of a one-phase correction now.

The shell correction is smaller and safer before Role 3 than after it.

---

## 2. Corrected visual model

### The structural reality

The SWIFT estate is a gateway sitting between two distinct worlds:

```
BANK INTERNAL SIDE  ←→  [SWIFT ESTATE]  ←→  EXTERNAL / NETWORK SIDE
```

**Bank internal side:** Payment engines, treasury systems, internal applications, operations, contingency entry. These systems *initiate* outbound messages and *receive* inbound messages.

**SWIFT estate:** The controlled gateway — boundary controls always present; role-specific function (access, scheme connectivity, routing/transform, controls, contingency, evidence) in the center.

**External / network side:** SWIFT network paths, external FIs and corporates connecting over SWIFT, scheme interfaces (CHAPS, Bacs, TARGET services, SEPA-related, CLS, CREST), correspondent banks, market infrastructures.

**Settlement and accounting truth:** Structurally outside both sides — not part of any active path.

### Proposed four-column grammar

```
BANK SYSTEMS  |  SWIFT ESTATE — boundary  |  SWIFT ESTATE — function  |  EXTERNAL / NETWORK SIDE
```

Or, compressing the SWIFT estate columns as currently implemented:

```
BANK SYSTEMS  |  SWIFT ESTATE (boundary + function)  |  EXTERNAL CONNECTIVITY / NETWORK PATHS
```

Followed below by:
- Evidence band (same as current)
- Settlement block outside (same as current, dashed border, no connecting track)

### Column definitions

| Column | Structural role | Contents |
|---|---|---|
| **Bank systems** (left) | Bank internal side | Payment engines, treasury, operations, internal apps, contingency entry systems. For outbound roles: *source*. For inbound roles: *destination*. |
| **SWIFT estate** (center) | Always the gateway | Boundary gates (auth, entitlement, signing) always active. Function core changes per role: access layer / scheme connector / routing / controls / contingency / evidence. |
| **External / network side** (right) | External network and scheme side | External FI and corporate access channels (SCORE/MA-CUG, secure web, API, scheme portals). Scheme connectivity rails (CHAPS, Bacs, TARGET, SEPA, CLS, CREST). SWIFT network paths. Correspondent bank nodes. For inbound roles: *source*. For outbound roles: *destination*. |

### Flow direction per role

Each role carries a direction designation that the visual signals explicitly:

| Role | Primary direction | Animation direction |
|---|---|---|
| R1 — Channel and secure access | Inbound | External → estate → bank systems |
| R2 — Scheme connector | Outbound (primary) | Bank systems → estate → scheme interfaces |
| R3 — Routing and transformation | Bidirectional | Both shown; dominant direction per scenario |
| R4 — Controls and repair | Overlay — bidirectional | Control gates active across both directions |
| R5 — Contingency entry | Internal/outbound | Bank internal (contingency) → estate → bank systems (onward routing) |
| R6 — Evidence and archive | Non-directional overlay | Evidence surface — both sides produce evidence |

### Direction signal in the visual

A small direction indicator — a text badge or directional chip — appears adjacent to the role label or role caption:

- `→ Outbound` for primarily outbound roles
- `← Inbound` for primarily inbound roles
- `⇄ Bidirectional` for roles that operate across both flows

This is not an interactive toggle in the first correction pass. It is a label that teaches the reader which direction to read the current role's flow. If a toggle is warranted later (see Option C below), it can be added on top of this label.

### What does not change

- Evidence band remains below the map, after the four-column area
- Settlement block remains structurally outside the map, dashed border, no connecting track
- Boundary gates remain always-present in the estate column
- The `seqToken`, `prefersReducedMotion`, and 6-step choreography structure remain unchanged

---

## 3. Role mapping

| Role | Primary direction | Teaching point | Visual emphasis |
|---|---|---|---|
| R1 — Channel and secure access | **Inbound channel** | External parties connect to the bank through the SWIFT estate | External side as active sources; bank systems as receiving destinations; boundary dominant |
| R2 — Scheme connector | **Outbound gateway** (primary) | The bank connects to schemes and market infrastructures via SWIFT messaging | Bank systems as active sources; scheme rails on external side as connectivity targets; note: SWIFT provides the messaging link, not settlement |
| R3 — Routing and transformation | **Bidirectional** | The estate classifies, transforms and routes messages in both directions | Both sides can be source or destination depending on scenario; function core (routing/transform) is dominant |
| R4 — Controls and repair | **Control overlay** | Controls are applied regardless of direction — the estate orchestrates validation, screening and repair | Controls dominate; destination/source distinction less important than the control path; disposition states (hold/release/reject) visible |
| R5 — Contingency entry | **Internal/outbound** | Contingency entry is bank-side, routes through the full estate boundary before reaching any output | Bank internal (contingency entry operator/system) is the source; full boundary dominant; onward processing is bank-side destination — not skipping out to external schemes |
| R6 — Evidence and archive | **Non-directional overlay** | The estate produces evidence for all message flows regardless of direction | Neither side dominates; evidence band is the primary active layer; the external and bank sides are shown to indicate that evidence covers both directions |

---

## 4. Role 1 correction

Role 1 should remain as a **primarily inbound** channel and access role. It does not need to become bidirectional for the following reason: the teaching point of Role 1 is that external parties (FIs, corporates) connect to the bank through the SWIFT estate, and the estate provides controlled access, authentication and evidence at that boundary. That is a specific inbound story. The outbound story — where bank systems initiate messages that exit through SWIFT — belongs to Role 2 (scheme connector) and is reinforced in Role 3 (routing/transformation).

**However, one adjustment is needed:** The current "Sources" column label should become **"External / channel access"** to signal that this column represents the external side of the gateway. It is not always the "source" — for outbound roles it is the destination. Renaming it to a structural label (external side) rather than a directional label (sources) prevents it from hard-coding inbound semantics into the HTML.

Role 1's source nodes (Corporate / FI, Secure web, API channel, SCORE / MA-CUG) should remain active for Role 1. They are on the external / channel access side, which is correct: these are external parties connecting inbound to the bank.

No animation change is needed for Role 1.

---

## 5. Role 2 correction

Role 2 currently models an inbound pattern: scheme / service access appears in the Sources (left) column as an external party connecting to the bank, and bank processing systems (Payments, Treasury) appear on the right as destinations. This is backwards for an outbound scheme connector role.

### What Role 2 should show

The bank's payment engine initiates a message to be sent outward via SWIFT to a scheme or market infrastructure. The SWIFT estate provides the controlled messaging path. The scheme interface (CHAPS, Bacs, TARGET, etc.) is on the external/network side as the connectivity target — not as a source.

**Corrected Role 2 source activation:** Bank systems (Payments, Treasury) on the bank-internal left side should be active as the *source* for the primary outbound direction.

**Corrected Role 2 external side:** Scheme connectivity rails (CHAPS, Bacs, TARGET services, SEPA-related, CLS, CREST) should appear on the external/network right side, each ending at a "Scheme / service interface" terminal. These are the *destinations* for outbound messages.

**The "Scheme / service access" source node:** In the corrected model, this node belongs on the external/network right side (it represents the access point from the scheme to the bank, for the inbound direction). For Role 2's outbound story, it is either muted or shown as context (the scheme can also send inbound — that is a secondary context). It should not be the primary active source.

### What does not change for Role 2

- Rail terminal labels remain "Scheme / service interface" — not "Settlement". This is correct and should be preserved.
- The outside-SWIFT note ("Settlement depends on scheme, account structure or market infrastructure") remains.
- The `servicePanelNote` ("Access model, messaging path and participant role vary by service") remains.
- The caption and insight panel text remain accurate.

The correction is structural (which column is source, which is destination) and labelling (column header), not content or accuracy.

---

## 6. Proposed implementation approach

### Option A — Column relabelling and role config adjustment (small refactor)

**What changes:**
1. Rename the left column from "Sources" → "Bank systems" (structural label, not directional)
2. Rename the right column from "Bank processing systems" → "External / network side" — and move the existing `DEST_NODES` (Payments, Treasury, Securities, Reporting) to the *left* column as bank-internal nodes
3. Add external-side nodes to the right column: FI/corporate access nodes, scheme connectivity rails (already in `RAIL_DEFS`) and a "SWIFT network" path node for inbound roles
4. Update `SrmRoleData` to reflect which nodes are active on the bank side vs. the external side per role
5. Add a direction badge (`data-srm-direction`) to the role selector or caption area, showing Inbound / Outbound / Bidirectional per role

**Files changed:**
- `frontend/src/viz/swiftRoleMap.ts` — column labels, `SOURCE_NODES` renamed/moved, `DEST_NODES` moved to bank-side, add external-side node definitions, update r1 and r2 role configs, add `direction` field to `SrmRoleData`
- `frontend/src/style.css` — add `.srm-direction-badge` styles; column header label changes are in HTML/JS (no new layout rules needed)

**Risk:** Low-medium. The HTML structure stays identical (4 columns, same CSS classes). The data wiring changes (which nodes are on which side per role). The animation choreography is unchanged. The `applyRole()` function gains one new field (`direction`) but the step sequence is the same.

**Effort:** Small — 1 day of implementation, covering r1 and r2 only.

**Phasing:** Safe to do before Role 3. Role 3 can then be implemented directly into the corrected shell without rework.

---

### Option B — Layout restructure: bank-left, external-right

**What changes:**
1. Restructure the 4-column grid so the left column is genuinely the bank-internal side and the right column is genuinely the external/network side
2. Reverse the column order from the current shell: bank systems → SWIFT estate → external/network
3. For inbound roles (R1): animate right → center → left
4. For outbound roles (R2): animate left → center → right
5. Update all role configs to reflect the new structural positions

**Files changed:**
- `frontend/src/viz/swiftRoleMap.ts` — full column restructure, animation direction logic per role, all role configs
- `frontend/src/style.css` — column layout changes, possibly `flex-direction` or `grid-column` reordering, animation class updates

**Risk:** High. This changes the column order visible to the user, reverses animation direction for inbound roles (R1's animation currently reads left-to-right; it would now read right-to-left), and requires updating all existing role configs. Any regression in the animation choreography will affect both R1 and R2 simultaneously.

**Effort:** Large — 2–3 days. Not safe to do in a single phase while roles are being added in parallel.

**Phasing:** Could be phased: do Option A first, then migrate to Option B once all 6 roles are defined. But the effort is higher and the visual disruption at cutover is larger.

**Recommendation:** Not the next step. Consider after cutover (Phase E) if the two-direction animation is needed for the live teaching visual.

---

### Option C — Direction toggle: Inbound / Outbound

**What changes:**
1. Add a two-state toggle (Inbound / Outbound) above or integrated into the role selector
2. Each role defines two configs: `inbound: SrmRoleData` and `outbound: SrmRoleData` (or shares a common base with direction-specific overrides for source/dest activation)
3. Toggling direction switches which nodes are active sources vs. destinations and optionally reverses the animation direction
4. The estate column (boundary + function) remains unchanged between directions

**Files changed:**
- `frontend/src/viz/swiftRoleMap.ts` — add direction toggle state, dual config per role, toggle event handling
- `frontend/src/style.css` — toggle button styling (`.srm-direction-toggle`)

**Risk:** Medium. More state to manage (`directionState × roleState`), more data per role, more test cases. The direction toggle makes the conceptual model explicit but adds a second interactive axis that a reader must understand before using the visual.

**Effort:** Medium — 1–2 days for implementation, but higher ongoing cost per role added (every new role needs both an inbound and outbound config).

**Phasing:** Safe to add after Option A correction. Start with Option A (structural fix + direction badge, no toggle), then evaluate whether the toggle genuinely teaches better or just adds cognitive load.

**Recommendation:** Evaluate after Role 3 is implemented in the corrected Option A shell. If the bidirectional story of Role 3 cannot be told clearly with a badge alone, introduce the toggle at that point.

---

### Summary

| Option | Files changed | Risk | Effort | Safe to phase |
|---|---|---|---|---|
| A — Column relabelling + role config adjustment | `swiftRoleMap.ts`, `style.css` (minor) | Low–medium | Small | Yes — do before Role 3 |
| B — Full layout restructure | `swiftRoleMap.ts`, `style.css` (major) | High | Large | No — defer to Phase E or post-cutover |
| C — Direction toggle | `swiftRoleMap.ts`, `style.css` (moderate) | Medium | Medium | Yes — but only after Option A |

**Recommended sequence:** Option A first, then reassess Option C at Role 3.

---

## 7. Recommended next implementation phase: Phase B1.5 — Shell direction correction

This phase is inserted between the completed Phase B1 (Role 2) and the planned Phase B2 (Role 3). It corrects the shell grammar before Role 3 extends the existing incorrect model.

### Scope

1. **Rename left column:** `SOURCE_NODES` → `BANK_SIDE_NODES`. Label in HTML: "Bank systems". Contains: bank payment engines, treasury, operations, internal app/file channel, contingency entry systems (muted until Role 5).

2. **Rename right column:** `DEST_NODES` → `EXTERNAL_NODES`. Label in HTML: "External / network side". Contains: FI / corporate (for inbound), scheme / service access portal, SWIFT network path, API channel. Scheme connectivity rails (CHAPS, Bacs, etc.) remain in the center-right `srm-service-panel` column — they represent the *connectivity paths* through which the estate reaches the external side, not the external side itself.

3. **Update r1 role config:**
   - `bankSideActive`: `['payments', 'treasury']` (bank systems receiving the inbound message)
   - `bankSideContext`: `[]`
   - `externalActive`: `['corporate-fi', 'secure-web', 'api-channel']` (external sources of the inbound message)
   - `externalContext`: `['score-macug']`
   - `direction`: `'inbound'`

4. **Update r2 role config:**
   - `bankSideActive`: `['payments', 'treasury']` (bank systems initiating the outbound message)
   - `bankSideContext`: `['securities', 'reporting']`
   - `externalActive`: []  (scheme rails in center-right panel are the outbound connectivity paths; the external side for Role 2 is the scheme interface, reached via the rails — no additional external node needs activation)
   - `externalContext`: `['scheme-service']` (contextual: schemes can also send inbound)
   - `direction`: `'outbound'`

5. **Add direction badge:** A small chip or text indicator adjacent to the role button row or caption, rendered per role. CSS class `.srm-direction-badge`. Three variants: `--inbound`, `--outbound`, `--bidirectional`.

6. **Update `SrmRoleData` interface:** Replace `sourcesActive/sourcesContext/destsActive/destsContext` with `bankSideActive/bankSideContext/externalActive/externalContext/direction`.

7. **Update `applyRole()`, `activateSources()`, `activateDests()`, `applyFinalState()`**: to use the new field names and to update the direction badge.

8. **Update mobile strip node labels:** For r1, the leftmost mobile node should reflect "Bank systems" not "Sources". For r2, the leftmost mobile node should reflect that Payments/Treasury are the *initiators*.

### What this phase does not do

- Does not implement Role 3.
- Does not change the SWIFT estate columns (boundary gates, function core, service panel rails).
- Does not change the animation choreography (6-step sequence stays the same; inbound and outbound both animate left-to-right through the estate columns, since the estate is always the center).
- Does not add a direction toggle (Option C deferred).
- Does not change the evidence band or settlement block.
- Does not change the chip-board visual (`swiftGatewayVisual.ts`).

### Quality gates required before commit

- `SWIFT_BANKING_ACCURACY_REVIEW.md` — verify r2 now correctly models outbound direction; verify r1 inbound story remains intact
- `INTEGRATION_STALENESS_REVIEW.md` — update file header comment in `swiftRoleMap.ts`, update `swift-bank-gateway.md` status line
- `PREMIUM_VISUAL_REVIEW.md` — verify direction badge is legible, positioned correctly, not distracting
- `CONTENT_EVIDENCE_REVIEW.md` — no new claims; verify nothing in the renamed labels introduces new conceptual risk

---

## 8. Acceptance criteria

A banking practitioner opening the corrected visual should be able to, **without reading surrounding page text**:

### Structural understanding (within 10 seconds per role)

**Role 1 (inbound):** See that external FIs and corporates are on the right (external/network side) connecting inbound to the SWIFT estate, and that bank payment systems on the left receive the message after passing through the estate. Read the direction badge: "Inbound."

**Role 2 (outbound):** See that bank payment and treasury systems on the left are the initiators, the SWIFT estate provides scheme connectivity in the center, and the scheme rails (CHAPS, Bacs, etc.) on the center-right represent outbound messaging paths to schemes and market infrastructures. Read the direction badge: "Outbound." Understand that the scheme rail terminals say "Scheme / service interface" — not settlement — and that settlement is in the outside block below.

### Key conceptual tests

A practitioner should be able to state, from the visual alone:

1. "The SWIFT estate is a gateway — it sits between the bank's internal systems and the external SWIFT network and schemes."
2. "For Role 1, external parties connect inbound to the bank through the estate."
3. "For Role 2, the bank connects outbound to schemes like CHAPS and Bacs — SWIFT provides the messaging path, not settlement."
4. "Bank processing systems (Payments, Treasury) are the bank's internal engines — they're sources in outbound flows and destinations in inbound flows."
5. "Settlement is outside SWIFT regardless of direction."

### Accuracy test (must not be possible to misread)

- A reader of Role 2 cannot conclude that SWIFT settles CHAPS or Bacs payments.
- A reader of Role 1 cannot conclude that the bank's systems are external parties.
- A reader of any role cannot conclude that "Bank processing systems" are the beneficiary bank or settlement destination.
- A reader of any role cannot conclude that settlement is achieved when the animation reaches the bank systems column.

### Practitioner comparison test

A practitioner familiar with SWIFT gateway architecture should recognise that the visual is trying to show SWIFT's dual role as both inbound channel and outbound gateway — and should not have to read the caption to understand which direction a given role operates.

---

## References

- `frontend/src/viz/swiftRoleMap.ts` — current route-map implementation (Phases A–B1)
- `frontend/src/style.css` — SRM CSS (`.srm-*`)
- `frontend/src/viz/swiftGatewayVisual.ts` — chip-board visual (do not change)
- `docs/visual-plans/swift-role-map-redesign.md` — original redesign proposal
- `docs/visual-plans/swift-bank-gateway.md` — implementation plan status
- `docs/quality-gates/SWIFT_BANKING_ACCURACY_REVIEW.md`
- `docs/quality-gates/PREMIUM_VISUAL_REVIEW.md`
- `docs/quality-gates/INTEGRATION_STALENESS_REVIEW.md`
