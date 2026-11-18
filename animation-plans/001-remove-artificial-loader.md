# 001 — Remove the artificial loading gate

- **Status**: DONE
- **Commit**: e0bd162
- **Severity**: HIGH
- **Category**: Purpose & frequency
- **Estimated scope**: 2 files, deletion-heavy

## Problem

Every visit is blocked by a timer that does not represent asset readiness:

```jsx
// src/App.js:23,37 — current
const [loading, setLoading] = useState(true);
{loading && <LoadingScreen onLoadingComplete={() => setLoading(false)} />}
```

`src/components/LoadingScreen.jsx:8-20` advances a fake percentage every 20ms, waits another 500ms, and then runs an 800ms exit. The portfolio is unavailable during that decorative sequence.

## Target

Render the portfolio immediately. Keep the existing `Suspense` fallback in `HeroVisual.jsx` responsible for the genuinely lazy 3D scene.

## Repo conventions to follow

- `src/App.js` already owns composition of every global surface.
- `src/components/Sections/Hero/HeroVisual.jsx` already has a local loading fallback for the lazy solar-system chunk.

## Steps

1. Remove `loading`, its body-overflow effect, `AnimatePresence`, and `LoadingScreen` from `src/App.js`.
2. Render the global surfaces, sections, and footer directly.
3. Delete the now-unreferenced `src/components/LoadingScreen.jsx`.

## Boundaries

- Do not change section order, portfolio data, links, or 3D loading behavior.
- Do not add a replacement timer or dependency.

## Verification

- **Mechanical**: `npm run build` succeeds and `rg "LoadingScreen|setLoading" src` returns no matches.
- **Feel check**: reload the page and confirm navigation and hero copy are immediately usable while the 3D fallback resolves independently.
- **Done when**: no artificial wait or scroll lock occurs on first paint.
