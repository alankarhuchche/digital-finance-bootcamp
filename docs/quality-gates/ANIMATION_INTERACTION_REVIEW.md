# Animation and Interaction Review

## Purpose
Validate motion quality, mode switching correctness and interaction safety. This gate ensures that animation teaches rather than decorates, that mode switching is reliable under normal and stressed conditions, and that reduced-motion and keyboard paths are implemented correctly.

## When to use
- At the end of any phase that adds or modifies an interactive visual component.
- After changing mode-switching logic, animation sequences or event handlers.
- Before committing any animated visual to the main branch.
- When testing a visual on a new viewport or device category.

---

## Pass criteria

A visual passes this gate when it:

- Animation explains a sequence, state change or movement — not just adds motion.
- Mode switching resets all previous state cleanly before applying new state.
- Rapid mode switching (clicking several modes in quick succession) does not produce ghost states, partial states or console errors.
- A cancellation token or equivalent mechanism prevents stale callbacks from firing after a mode has changed.
- Reduced-motion path: when `prefers-reduced-motion: reduce` is active, all animation is skipped and the final state is applied immediately.
- Active mode and active layers are visually obvious without animation playing.
- Keyboard users can switch modes using Enter or Space.
- No console errors under any switching pattern.
- Animation sequences complete before the next user interaction would be confusing.
- The visual is understandable in its final state even if the user missed the animation.

---

## Fail criteria

A visual fails this gate when it:

- Leaves stale state from a previous mode visible after switching.
- Shows a partial or half-activated state after rapid clicking.
- Allows stale setTimeout/setInterval callbacks to fire and modify state after mode has changed.
- Has no reduced-motion path (or reduced-motion path is broken).
- Has animation that runs continuously or loops without user interaction.
- Has animation that does not teach the concept — just adds motion for decoration.
- Makes the active mode ambiguous after switching (the reader cannot tell which mode is active).
- Breaks on mobile tap events (tap does not register, double-tap required, or tap triggers wrong mode).
- Has keyboard inaccessible mode controls (no focus ring, no Enter/Space handling).
- Produces console errors on any switching pattern.
- Has animation so fast that the teaching point is missed, or so slow that it feels broken.

---

## Cancellation token requirement

Any visual that uses `setTimeout` for sequenced animation must implement a cancellation mechanism:

- A module-level integer counter (`seqToken`) incremented on every mode switch.
- Each scheduled callback checks whether the current token still matches before modifying state.
- If the token has changed, the callback exits without modifying state.

This is the pattern used by the Bank Route Map and must be used by all future animated visuals.

---

## Reduced-motion requirement

Every animated visual must check `window.matchMedia('(prefers-reduced-motion: reduce)')`:

- If true: skip all animation sequences, apply final state immediately.
- `applyFinalState()` or equivalent must be called synchronously.
- No timeouts should fire in reduced-motion mode.
- The visual must still be fully usable and informative without animation.

---

## Review checklist

- [ ] Switch between all modes in order. Does each mode reset cleanly before applying new state?
- [ ] Rapid-switch test: click all modes quickly (< 200ms between clicks). Check for ghost state, partial state or console errors.
- [ ] Check cancellation: is there a token counter or equivalent? Does rapid switching respect it?
- [ ] Enable `prefers-reduced-motion` in browser settings. Switch all modes. Is animation skipped and final state correct?
- [ ] Check keyboard: tab to each mode button, press Enter and Space. Does it activate the mode?
- [ ] Check focus ring: is a visible focus indicator shown on mode buttons?
- [ ] Open browser console. Switch all modes. Any errors?
- [ ] Describe the teaching point of each animation step. Is every step teaching something, or is any step decorative?
- [ ] Check animation timing: is each step long enough to see, short enough not to bore?
- [ ] On mobile: tap each mode. Does it activate on single tap? Does it produce any overflow or layout shift?
- [ ] Check final state: cover the animation and look only at the end state. Is the active mode and active layer obvious?

---

## Example red flags

**Fail — stale state after rapid switching:**
> User clicks Mode 1 → Mode 2 → Mode 3 quickly. Mode 3 is active but some Mode 1 elements are still highlighted due to a stale setTimeout firing.

**Pass — cancellation token working:**
> User clicks Mode 1 → Mode 2 → Mode 3 quickly. Mode 3 is active; all Mode 1 and Mode 2 callbacks checked the token, found it stale, and exited without modifying state.

---

**Fail — decorative animation:**
> A spinning icon rotates continuously in the background while mode text updates. The rotation does not correspond to any state change.

**Pass — instructive animation:**
> When Mode 2 is selected, the funding/on-ramp step activates first (150ms), then the on-ledger token panel glows (430ms), then the evidence badge fades in (900ms). Each step corresponds to a distinct concept.

---

**Fail — broken reduced-motion:**
> With `prefers-reduced-motion: reduce` active, the visual shows a blank canvas for two seconds before the final state appears (setTimeout still fired).

**Pass — correct reduced-motion:**
> With `prefers-reduced-motion: reduce` active, `applyFinalState()` is called synchronously. All layers show their correct active/muted state immediately with no delay.

---

## Required report format

After completing this review, report:

1. Visual name and phase.
2. Mode switching test results (each mode, in order and rapid).
3. Cancellation mechanism confirmed or flagged.
4. Reduced-motion test result.
5. Keyboard accessibility test result.
6. Console errors: none or listed.
7. Animation teaching point assessment: instructive or decorative for each step.
8. Mobile tap test result.
9. Any issues found and how resolved.
10. Pass or fail verdict with reason.
