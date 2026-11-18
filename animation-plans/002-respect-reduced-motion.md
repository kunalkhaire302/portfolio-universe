# 002 — Respect reduced motion across UI and canvases

- **Status**: DONE
- **Commit**: e0bd162
- **Severity**: HIGH
- **Category**: Accessibility
- **Estimated scope**: 7 files, small prop plumbing

## Problem

Only part of the solar system samples the preference, once:

```jsx
// src/components/SolarSystem/SolarSystem.jsx:110 — current
const reducedMotion = useMemo(() => prefersReducedMotion(), []);
```

Framer entrances, the particle canvas, Earth/cloud rotation, sun plasma, and sparkles continue moving when `prefers-reduced-motion: reduce` is enabled.

## Target

- Wrap the app in `<MotionConfig reducedMotion="user">` so Motion removes transform/layout motion while preserving useful opacity feedback.
- Use Framer Motion's reactive `useReducedMotion()` for canvas code.
- Under reduced motion, draw the 2D particle field once, stop Earth/cloud/star/sun decorative rotation, and stop sparkles.

## Repo conventions to follow

- Framer Motion 12.30.0 is already installed and exports both `MotionConfig` and `useReducedMotion`.
- `Starfield`, `Planet`, `Saturn`, and `CameraController` already accept a `reducedMotion` prop.

## Steps

1. Wrap `<App />` with `MotionConfig reducedMotion="user"` in `src/index.js`.
2. Replace the one-time `matchMedia` snapshot in `SolarSystem.jsx` with `useReducedMotion()`; pass it to `Sun`, `Starfield`, `CameraController`, planets, Saturn, and Sparkles.
3. Add a `reducedMotion` prop to `Sun.jsx`; retain static corona sizes but skip time/rotation/pulse updates.
4. In `EarthScene.jsx`, call `useReducedMotion()`, treat it like pause for Earth/Clouds, and pass it to `Starfield`.
5. In `ParticleBackground.jsx`, call `useReducedMotion()`; render one static frame and omit mouse/rAF listeners when true.
6. Add a global reduced-motion CSS rule that disables smooth scrolling and collapses CSS animation/transition movement without hiding content.

## Boundaries

- Do not remove user-controlled orbit/zoom interactions.
- Do not change scene composition, textures, or portfolio content.
- Do not disable opacity feedback that communicates state.

## Verification

- **Mechanical**: `npm run build` succeeds.
- **Feel check**: emulate `prefers-reduced-motion: reduce`; section/hero transforms collapse, particle/Earth/solar decoration stays still, and navigation/modal state remains legible.
- **Done when**: toggling the browser preference updates all motion paths without a reload.
