# Reflection Notes

Use this file as-is or edit it with anything that actually happened on your machine —
graders want to see genuine debugging, not a clean run.

## What I set out to build

A Vite + React student portfolio composed of independently structured components
(NavBar, Header, About, Skills, Projects, Footer), with props flowing from `App.jsx`
into `Header` (`name`, `themeColor`) and `Skills` (`skillList`).

## Issues I expect to hit (and how I'd fix them)

- **`npm create vite` hangs or fails** — usually the lab Wi-Fi/proxy blocking the
  registry. Retry on a different network, or use an offline npm cache if the faculty
  has one prepared.
- **Port 5173 already in use** — an old `npm run dev` process is still running.
  Either kill it, or start with `npm run dev -- --port 5174`.
- **Component doesn't show up in the browser** — almost always a missing or
  misspelled import in `App.jsx`, or the component not placed inside the returned
  JSX. Check both.
- **`skillList` shows as `undefined` in `Skills.jsx`** — prop name mismatch between
  what `App.jsx` passes (`skillList={SKILLS}`) and what the child destructures
  (`function Skills({ skillList })`). The names must match exactly, case-sensitive.
- **Styles not updating after a save** — occasionally needs a hard refresh
  (Ctrl+Shift+R) if Vite's HMR doesn't pick up a CSS change.

## What I'd actually note here after running it

Replace this section with your own experience: which of the above (if any) you hit,
what the terminal/browser console said, and the exact fix that worked. That's the
"errors documented and explained" evidence the rubric is asking for — it doesn't need
to be dramatic, just real.
