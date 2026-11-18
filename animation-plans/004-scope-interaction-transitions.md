# 004 — Scope interaction transitions and press feedback

- **Status**: DONE
- **Commit**: e0bd162
- **Severity**: HIGH
- **Category**: Performance / physicality
- **Estimated scope**: 10 files, mechanical class edits

## Problem

Shared and component-local controls use `transition-all`, while primary controls have no press response:

```css
/* src/index.css:49 — current */
.btn-primary {
  @apply ... transition-all duration-300 ...;
}
```

Representative repeats exist in `EarthUI.jsx`, `CertificationSection.jsx`, `ContactSection.jsx`, `ExperienceSection.jsx`, `HeroCapabilityStrip.jsx`, `HeroContent.jsx`, `ProjectsSection.jsx`, `SkillsSection.jsx`, and `PlanetInfoPanel.jsx`. This opts future and layout-affecting properties into animation.

## Target

- Use exact property lists: color/background/border/opacity for visual feedback, transform for lift/press, and shadow only where the design already changes it.
- Use 150–200ms for frequent controls and 200–250ms for cards.
- Primary pressables use `active:scale-[0.97]` with 160ms strong ease-out semantics.
- Pointer-only lift/scale effects are gated behind `(hover: hover) and (pointer: fine)` or removed.

## Repo conventions to follow

- Keep Tailwind utility styling and existing color/shadow values.
- Add only the shared `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` token needed by press feedback.

## Steps

1. Replace every remaining `transition-all` in `src` with the exact properties each element changes.
2. Bring project/card hover durations from 500ms to 200–250ms.
3. Add 160ms `scale(0.97)` press feedback to buttons and CTA-style links.
4. Gate decorative hover translation/scale on fine pointers; keep color changes available without movement.
5. Confirm `rg "transition-all" src` returns no matches.

## Boundaries

- Do not change colors, copy, URLs, card content, or component markup except where a class needs a targeted hook.
- Do not animate layout properties or add `will-change` without a measured shift.

## Verification

- **Mechanical**: `npm run build` succeeds; `rg "transition-all" src` returns no matches.
- **Feel check**: buttons respond immediately on press; card hovers settle within 250ms; touch emulation shows no sticky lift/scale.
- **Done when**: exact properties are named everywhere and primary controls have subtle press feedback.
