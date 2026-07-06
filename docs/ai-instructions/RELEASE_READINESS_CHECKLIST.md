# Release Readiness Checklist

Complete this checklist before recommending commit and release of any page.

All items must be PASS or explicitly documented as DEFERRED with human approval before proceeding.

---

## Build

- [ ] `npx tsc --noEmit` — zero errors
- [ ] `npx vite build` — clean build, no new warnings beyond pre-existing
- [ ] No new console errors on any tested route

---

## Quality gates

- [ ] AI_WRITING_REVIEW — PASS
- [ ] PAYMENTS_DLT_ACCURACY_REVIEW or SWIFT_BANKING_ACCURACY_REVIEW — PASS
- [ ] OVERCLAIMING_RISK_REVIEW — PASS
- [ ] PREMIUM_VISUAL_REVIEW — PASS
- [ ] ANIMATION_INTERACTION_REVIEW — PASS
- [ ] MOBILE_ACCESSIBILITY_REVIEW — PASS
- [ ] INTEGRATION_STALENESS_REVIEW — PASS

---

## Page content

- [ ] Opening thesis is accurate and present
- [ ] All misconceptions to correct are addressed
- [ ] No overclaims about SWIFT, messaging, settlement or finality
- [ ] No hype language
- [ ] No operationally sensitive security detail
- [ ] All block labels are concise (≤4 words where possible)
- [ ] Quiz questions are factually correct and non-misleading
- [ ] Page passes the banking relevance test for each section

---

## Visual

- [ ] Visual renders in all four role modes
- [ ] Mode switching clears previous state cleanly
- [ ] Rapid switching (4 clicks at <200ms) leaves no ghost state
- [ ] All active layers illuminate in sequence
- [ ] Sequence nodes show correct step numbers for each role
- [ ] Caption updates on each role switch
- [ ] Muted layers remain visible at low opacity
- [ ] No money tokens animate through SWIFT layers
- [ ] Money/settlement outside SWIFT is visually distinct

---

## Accessibility and reduced-motion

- [ ] `aria-pressed` correct on role buttons
- [ ] `role="status"` on caption
- [ ] `aria-hidden="true"` on all decorative elements
- [ ] `role="group"` with `aria-label` on button row
- [ ] Reduced-motion path shows final state immediately, no animation
- [ ] Keyboard: Tab, Enter, Space work on all interactive elements
- [ ] Visible focus ring on all interactive elements

---

## Mobile

- [ ] No horizontal overflow at 375px
- [ ] All text readable without zoom
- [ ] Mode/role buttons usable with single tap, all ≥44px
- [ ] Glyph column hidden on mobile without breaking layout
- [ ] Sequence nodes visible or gracefully hidden on mobile

---

## Registry and metadata

- [ ] Module added to `registry.ts` with correct `id`, `number`, `title`, `summary`
- [ ] `ready: true` set (or intentional if `false`)
- [ ] `updatedAt`, `changeType: 'new'`, `changeSummary` correct
- [ ] Category placement correct in `CATEGORIES` array
- [ ] Module loader added to `LOADERS` in `registry.ts`
- [ ] Module file name matches loader path

---

## Integration staleness

- [ ] No stale phase language in source files or docs
- [ ] Visual plan status updated to reflect implementation state
- [ ] File header comments match implementation
- [ ] No duplicate flow-path config that could drift from sequence source of truth

---

## Navigation and routing

- [ ] Topic appears in sidebar in correct position
- [ ] Topic card appears in correct category on homepage
- [ ] Prev/next navigation links are correct
- [ ] Direct URL load works: `/topic/swift-bank-gateway`
- [ ] Recently updated strip shows correct entry

---

## Human review

- [ ] Phase completion report reviewed and approved
- [ ] All deferred items documented and accepted
- [ ] Human has confirmed commit is approved
- [ ] Commit message agreed

---

## Commit gate

Do not commit until every item above is PASS or explicitly DEFERRED with human sign-off.
