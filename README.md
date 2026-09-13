# Student Portfolio — Practical 1 (ITUE301)

Advanced Web Development Frameworks · React + Vite component architecture practical.

## Live component tree

```
App.jsx
 ├── NavBar.jsx     (scroll-spy navigation, highlights active section)
 ├── Header.jsx     (props: name, themeColor)
 ├── About.jsx
 ├── Skills.jsx     (props: skillList — rendered dynamically)
 ├── Projects.jsx   (hardcoded list of 3 projects)
 └── Footer.jsx
```

## Run locally

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL (usually `http://localhost:5173`).

## What satisfies the practical's requirements

- **4+ reusable components**: Header, About, Skills, Footer, plus NavBar and Projects
  (supplementary problems) — 6 total, each in its own file under `src/components`.
- **No duplicated logic/JSX**: every section is its own component; `App.jsx` only composes them.
- **Props into 2+ components**: `Header` receives `name` and `themeColor`; `Skills` receives
  `skillList` (an array rendered with `.map()`).
- **Supplementary problems**:
  - `NavBar` highlights the active section using scroll position (`useEffect` + `scroll` listener).
  - `Skills` renders an array of skills dynamically via props.
  - `Header` accepts a `themeColor` prop and applies it as an inline style on the eyebrow text
    and the typing cursor.
- **Post-lab task**: `Projects` renders a hardcoded list of 3 projects.

## Build

```bash
npm run build
```

Outputs a production build to `dist/`.
