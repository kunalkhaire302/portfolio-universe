# 003 — Make navigation finish with the user

- **Status**: DONE
- **Commit**: e0bd162
- **Severity**: HIGH
- **Category**: Choreography
- **Estimated scope**: 1 file

## Problem

The mobile menu animates its container and then queues eight rows:

```jsx
// src/components/Layout/Navigation.jsx:236-238 — current
initial={{ x: -50, opacity: 0 }}
animate={{ x: 0, opacity: 1 }}
transition={{ delay: i * 0.1, duration: 0.5 }}
```

The last item finishes at 1.2s. Navigation is high-frequency product UI, so stagger delays make the user wait through a performance.

## Target

| Element | Role | Starts | Duration | Motion | Relationship |
| --- | --- | --- | --- | --- | --- |
| Mobile overlay | Lead | 0ms | 200ms | opacity only | — |
| Menu rows | Static | — | — | none | Carried by overlay |
| Active indicator | Support | 0ms | 250ms | shared-position spring | Together with selection |

## Repo conventions to follow

- Keep existing `AnimatePresence` for overlay exit.
- Use the strong ease-out array `[0.23, 1, 0.32, 1]` for entry/exit.

## Steps

1. Give the overlay an explicit 200ms strong ease-out transition.
2. Replace per-row `motion.a`/`motion.button` entrances with immediately interactive `a`/`button` elements.
3. Reduce the active indicator to the existing Apple-style spring with `duration: 0.25` and `bounce: 0.2`.
4. Replace broad transitions with exact color/background/border/shadow/transform properties under 250ms.
5. Add `scale(0.97)` press feedback to navigation controls and restore body overflow on cleanup.

## Boundaries

- Preserve scroll spy, downloads, section scrolling, link labels, and responsive breakpoints.
- Do not add a menu library or new animation abstraction.

## Verification

- **Mechanical**: `npm run build` succeeds.
- **Feel check**: at mobile width, open/close repeatedly and confirm every row is usable immediately; scrub the 200ms fade and confirm no queued movement remains.
- **Done when**: the menu fully appears within 200ms and rapid toggles never leave body scrolling locked.
