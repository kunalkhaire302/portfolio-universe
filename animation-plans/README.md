# Animation improvement plans

| Plan | Title | Severity | Status |
| --- | --- | --- | --- |
| 001 | Remove the artificial loading gate | HIGH | DONE |
| 002 | Respect reduced motion across UI and canvases | HIGH | DONE |
| 003 | Make navigation finish with the user | HIGH | DONE |
| 004 | Scope interaction transitions and press feedback | HIGH | DONE |
| 005 | Move pointer tracking outside React render | HIGH | DONE |

Recommended order: 001 → 002 → 003 → 004 → 005. Plan 002 establishes accessibility behavior used by the later interaction changes; plans 003–005 are otherwise independent.
