# Mobile and Accessibility Review

## Purpose
Validate that every visual and interactive element is readable and usable on mobile, and that accessibility requirements are met for keyboard users, screen reader users and users with reduced-motion preferences.

## When to use
- At the end of any phase that adds or modifies a visual component, page section or interactive element.
- Before committing any layout change that could affect mobile or accessibility.
- When adding a new section to the homepage or a topic page.
- When reviewing a visual that uses animation, mode switching or layered states.

---

## Pass criteria

A page or visual passes this gate when it:

- Has no horizontal overflow at 375px viewport width.
- All labels and text are readable at 375px without pinching or zooming.
- Mode selector (tabs, pills, scenario buttons) is usable with a single tap at 375px.
- Tap targets are at least 44px × 44px (Apple HIG and WCAG 2.5.5).
- The visual still teaches its core concept on mobile, even if the full canvas is hidden.
- A mobile alternative (strip, stack or simplified view) is present when the main visual would be too dense.
- Keyboard users can reach and activate all interactive elements using Tab, Enter and Space.
- A visible focus ring is shown on all interactive elements.
- `aria-pressed` or equivalent is set on mode/scenario buttons to reflect active state.
- `aria-live` or `role="status"` is used for dynamic content updates (scenario change announcements).
- Screen reader announcements are concise — they describe the scenario or mode, not every animation step.
- `prefers-reduced-motion` is respected: no animation fires, final state is correct.
- All colour distinctions have a non-colour equivalent (shape, weight, label, opacity pattern).

---

## Fail criteria

A page or visual fails this gate when it:

- Shows horizontal overflow at 375px.
- Has labels that are clipped, truncated without indication, or too small to read (< 11px effective size).
- Has tap targets smaller than 44px in any dimension.
- Has a mode or scenario selector that requires precise clicking rather than generous tap areas.
- Has no mobile alternative for a canvas that is too dense at 375px.
- Has keyboard-inaccessible interactive elements (no Tab focus, no Enter/Space activation).
- Has no visible focus ring on interactive elements.
- Announces every animation step to screen readers (noisy aria-live).
- Has no aria-live region for dynamic scenario/mode content updates.
- Uses colour as the only way to distinguish active from inactive states.
- Has animation that fires even with `prefers-reduced-motion: reduce` active.
- Has text that requires horizontal scrolling to read.

---

## Minimum tap target requirement

All interactive elements (buttons, tabs, pills, links) must have an effective tap area of at least 44px × 44px, achieved through padding if needed. This applies to:

- Scenario selector buttons.
- Mode tabs.
- Quiz answer options.
- Jump navigation links.
- Any link in a card or caption area.

---

## Reduced-motion requirement

See also: ANIMATION_INTERACTION_REVIEW.md.

- `prefers-reduced-motion: reduce` must skip all animation and apply final state immediately.
- The visual must be fully usable and informative in the reduced-motion state.
- The reduced-motion path must be tested explicitly, not assumed to work.

---

## Aria requirements

| Element | Requirement |
|---|---|
| Mode/scenario buttons | `aria-pressed="true/false"` updated on switch |
| Dynamic content region (caption, insight panel, mode card) | `role="status"` or `aria-live="polite"` |
| Screen reader announcement text | Concise scenario/mode description only |
| Navigation groups | `role="group"` with `aria-label` |
| Mode selector group | `aria-label="Payment modes"` or equivalent |
| Visual element groups | `aria-label` on containing element |
| Decorative animation elements | `aria-hidden="true"` |

---

## Review checklist

**Mobile (375px):**
- [ ] Set viewport to 375px. Scroll through the full page. Any horizontal overflow?
- [ ] Read every label. Any text too small or clipped?
- [ ] Tap each mode/scenario button. Single tap activates? No double-tap required?
- [ ] Measure tap targets. All ≥44px in height?
- [ ] Is a mobile strip or simplified view present where the main canvas would be too dense?
- [ ] Is the mobile alternative informative — does it teach the same concept?
- [ ] Scroll depth assessment: how many screens before the user reaches the topic grid or key content?

**Reduced-motion:**
- [ ] Enable `prefers-reduced-motion: reduce` in browser settings.
- [ ] Switch all modes. No animation fires?
- [ ] Final state is correct and fully informative without animation?

**Keyboard:**
- [ ] Tab through all interactive elements on the page. All reachable in logical order?
- [ ] Press Enter and Space on each interactive element. All activate correctly?
- [ ] Visible focus ring on all interactive elements?

**Screen reader:**
- [ ] Switch modes. Is the announcement concise (scenario description only, not every step)?
- [ ] Is `aria-pressed` updated correctly on scenario/mode buttons?
- [ ] Are decorative animation elements hidden from screen readers?

**Colour and contrast:**
- [ ] Is every state distinction (active/inactive) shown through at least one non-colour signal?
- [ ] Text contrast ≥4.5:1 for body text, ≥3:1 for large text (WCAG AA)?

---

## Example red flags

**Fail — horizontal overflow:**
> At 375px, the mode selector row extends beyond the viewport edge, requiring horizontal scroll.

**Pass:**
> At 375px, the mode selector wraps to a 2×2 grid. All four buttons are fully visible and tappable.

---

**Fail — noisy aria-live:**
> Screen reader announces each animation step: "Source activated. Gate 1 activated. Gate 2 activated. Route decision activated."

**Pass:**
> Screen reader announces once: "UK domestic payment route: retail mobile through identity and consent, route decision, Faster Payments to scheme confirmation, customer ledger."

---

**Fail — colour-only distinction:**
> Active layers are shown in amber; inactive layers are shown in dark grey. No other difference.

**Pass:**
> Active layers are full opacity with a label; inactive layers are 0.25 opacity with a visible but muted label. The distinction is conveyed by opacity and label weight, not colour alone.

---

## Required report format

After completing this review, report:

1. Viewport tested (375px confirmed).
2. Horizontal overflow: none or listed elements.
3. Label readability: all pass or flagged elements.
4. Tap target audit: all ≥44px or flagged elements.
5. Mobile alternative: present and informative, or missing.
6. Reduced-motion result: pass or fail with detail.
7. Keyboard accessibility: all elements reachable and activatable, or flagged.
8. Aria implementation: confirmed or gaps found.
9. Colour contrast: pass or flagged.
10. Pass or fail verdict with reason.
