# Kunal Khaire — Portfolio Universe

A responsive developer portfolio for Kunal Khaire, a full-stack developer and AI application builder. The experience combines a semantic project constellation, selected-project storytelling, an interactive technology network, a career timeline, and accessible contact and credential flows.

[Live portfolio](https://www.kunaluniverse.tech/) · [Report an issue](https://github.com/kunalkhaire302/portfolio-universe/issues)

## Highlights

- Real-data Project Constellation with keyboard-focus previews and direct project links.
- Sticky featured-project stack on desktop with a conventional card layout on smaller screens.
- Keyboard-selectable technology categories sourced from the portfolio data model.
- Scroll-triggered section reveals that respect `prefers-reduced-motion`.
- Accessible mobile navigation, certificate dialog focus management, and visible focus states.
- Dark navy/cyan design system with mobile safe-area and touch interaction support.
- Lightweight active runtime: the production bundle does not load the legacy Three.js scenes.

## Stack

- React 19 and Create React App
- Framer Motion
- Tailwind CSS 3 plus a shared CSS design system
- React Icons
- Testing Library and Jest
- Vercel deployment configuration

## Local development

```bash
git clone https://github.com/kunalkhaire302/portfolio-universe.git
cd portfolio-universe
npm install
npm start
```

The development server opens at `http://localhost:3000` by default.

## Verification

```bash
npx eslint src --no-cache
npm test -- --watchAll=false
npm run build
```

## Project structure

```text
public/                  Static metadata, icons, and resume
src/components/         Layout, sections, and interactive UI
src/data/portfolioData  Verified personal, project, skill, and experience data
src/index.css           Shared design, motion, and responsive system
tailwind.config.js      Theme tokens and responsive configuration
vercel.json             Production deployment settings
```

## Updating content

Edit `src/data/projects.json` for project cards and their `/projects/<slug>` articles. Each entry records the repository, reviewed branch, commit, retrieval date and source paths. Verify those references when refreshing an article. Store reviewed screenshots and demo stills in `public/case-studies/`. The other homepage sections use `src/data/portfolioData.js`.

## Contact

- [GitHub](https://github.com/kunalkhaire302)
- [LinkedIn](https://linkedin.com/in/kunal-khaire)
- [Email](mailto:kunalkhaire302@gmail.com)
