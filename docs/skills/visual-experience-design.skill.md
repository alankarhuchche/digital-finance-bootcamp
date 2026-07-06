# Skill: Visual Experience Design

## Purpose

Use this skill when designing, implementing or reviewing any interactive visual component in this repo. It encodes the visual quality bar, interaction model patterns and anti-patterns specific to this site.

---

## Visual quality bar

A visual on this site must:

1. **Teach through interaction.** Mode or role switching must reveal something a static diagram cannot. If clicking a button just highlights a row, it is not earning its complexity.
2. **Show what is muted as part of the lesson.** Muted layers are not decoration — they tell the reader what this role or mode does not involve.
3. **Use concise labels.** Layer row labels: ≤4 words. Chips: short noun phrases. Sublabels: one clause maximum.
4. **Never animate money or value.** No tokens, coins or currency icons move through layers.
5. **Never loop animation without interaction.** All animation is triggered by user action or page entry. No autonomous looping.
6. **Use the site colour system.** `var(--amber)`, `var(--teal)`, `var(--coral)`, `var(--mid)`, `var(--surface)`, `var(--fg)`. No hardcoded colours.

---

## Interaction model — role/mode switching

The canonical pattern is `whatMovesVisual.ts`. When building a new role-mode visual:

### Required elements

- **`seqToken`** — module-level integer, incremented on every mode or role switch. All `setTimeout` callbacks must check `if (seqToken !== token) return;` before any DOM mutation.
- **Sequence nodes** — numbered circular nodes showing activation order. Derived from `mode.sequence` or equivalent — never from DOM order.
- **`sublabelOverrides`** — role- or mode-specific sublabels defined in the data layer, not hardcoded in the render function.
- **`prefersReducedMotion()` path** — all nodes appear synchronously, no animation, no timeouts, when reduced motion is preferred.
- **`role="status"` caption** — updates on each mode or role switch.
- **`aria-pressed`** — correct on each button, updated on switch.
- **`aria-hidden="true"`** — on all decorative elements (glyphs, sequence nodes).

### Required CSS classes (adapt names to new component)

- Base node class: invisible by default (`opacity: 0`).
- Active node class: visible, amber border and text.
- Pulse animation class: settles to active after ~650ms.
- `@keyframes` pulse: scale up then settle.
- Mobile override: smaller node size.
- `@media (prefers-reduced-motion: reduce)`: `transition: none`, `animation: none`.

### Sequence and timing

- Stagger activations: 120ms between steps (adapt to role complexity).
- Pulse animation duration: 650ms, then settles to `--active` class.
- Pulse cleanup timeout: 680ms, must check `seqToken !== token` before settling.
- All timeouts are registered at the same `token` value captured at mode switch start.

---

## Layer design

When defining persistent layers for a new visual:

1. Every layer must be present at all times — visible at low opacity when muted.
2. Muted opacity: `0.22`. Active opacity: `1.0`.
3. Active layers get a left border accent (`var(--wmv-accent)` or equivalent CSS variable).
4. If one layer must always be muted (e.g., to show that something is outside scope), give it a distinct visual treatment — dashed border, different background, or "outside X" label. Never activate it.
5. Layer count: 8–12 is practical for mobile legibility. More than 12 is likely a design smell.

---

## Mobile requirements

- Role/mode buttons: `flex: 1 1 140px; flex-wrap: wrap; min-height: 44px`. Must render usably at 375px.
- Glyph column: `display: none` on mobile.
- Sequence nodes: 16px at mobile (vs 18px desktop).
- No horizontal overflow at 375px.
- All sublabels: `overflow-wrap: break-word`.
- Verify with `preview_resize` at `mobile` preset before reporting phase complete.

---

## Anti-patterns

- **DOM order sequencing.** Never derive step numbers from DOM order. Always use the data-layer sequence definition.
- **classList.contains guard for cancellation.** Use `seqToken !== token` not `classList.contains('--pulse')`.
- **Hardcoded colours.** Always use CSS custom properties.
- **Long label text on layer rows.** Labels that wrap on desktop will break on mobile.
- **Looping animation.** No `animation-iteration-count: infinite` on any interactive element.
- **Blocking animation without reduced-motion path.** Every animation must have an immediate/synchronous alternative.
- **Money animation.** Never animate value or funds moving through layers, even as a metaphor.
- **New npm dependencies for a visual.** All visuals are plain TypeScript — no additional libraries.

---

## Reference implementation

`frontend/src/viz/whatMovesVisual.ts` — canonical role-mode visual.

When in doubt about a pattern, read this file first. If the new visual needs a substantially different pattern, document why before implementing.
