# 005 — Move pointer tracking outside React render

- **Status**: DONE
- **Commit**: e0bd162
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 2 files

## Problem

The custom cursor writes React state on every mouse move:

```jsx
// src/components/UI/CustomCursor.jsx:5-13 — current
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
```

That re-renders React at pointer frequency while two WebGL scenes and a particle rAF loop are also active.

## Target

Use Framer Motion values/springs for `x` and `y` so pointer updates bypass React. React state may remain only for the low-frequency hover-size state. Hide the cursor unless the device has a fine hover pointer, and hide it under reduced motion.

## Repo conventions to follow

- Framer Motion is already the cursor's animation driver.
- Use the existing spring `{ stiffness: 150, damping: 15, mass: 0.5 }`.

## Steps

1. Replace position state with `useMotionValue` plus `useSpring`.
2. Write pointer coordinates with `.set()` inside the mousemove handler.
3. Put the ring and dot inside one transformed motion wrapper so both follow the same composited transform.
4. Add a `.custom-cursor` CSS gate for `min-width: 768px`, `(hover: hover)`, `(pointer: fine)`, and no reduced-motion preference.

## Boundaries

- Preserve ring growth and color/border changes over links and buttons.
- Do not add global pointer listeners beyond the existing two.

## Verification

- **Mechanical**: `npm run build` succeeds.
- **Feel check**: move rapidly across links and buttons; the ring follows smoothly, the dot remains centered, and no cursor renders under touch or reduced-motion emulation.
- **Done when**: mousemove performs no React state update.
