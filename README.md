# OnTrack

Daily time tracker: assign an activity to each hour of the day, time it with a stopwatch and follow how close every activity is to its daily target. Built in July 2023 as a learning project.

**Live demo:** [vue-ontrack.vercel.app](https://vue-ontrack.vercel.app)

## Features

- A timeline of 24 hourly slots where each hour gets an activity or stays as Rest. The current hour is highlighted, and the timeline scrolls to it when opened.
- A stopwatch in every slot with start, pause and reset. Only the stopwatch of the current hour can be started.
- An activities page to add and delete activities and set a daily target from 15 minutes to 8 hours. Each activity shows the time still missing or the time over its target, and deleting it also clears it from the timeline.
- A progress page with a colored bar for every activity that has a target, showing the percentage and the tracked time against the target.
- The header shows the progress of the whole day and changes to "Day complete!" at 100%.
- Three sample activities (Coding, Reading and Training) with 15-minute targets are loaded on start.

## Tech stack

- **Framework:** Vue 3 (Composition API with `<script setup>`), JavaScript
- **State:** module-level `ref` and `computed` state, no state library
- **Routing:** hash-based page switching in `src/router/router.js`, no router library
- **UI:** Heroicons 2
- **Styling:** Tailwind CSS 3, PostCSS
- **Tooling:** Vite 4, ESLint 8 with eslint-plugin-vue, Prettier 3 with prettier-plugin-tailwindcss
- **Hosting:** Vercel

## Getting started

You need Node.js 18 or later; no API keys are required.

```bash
git clone https://github.com/androfficial/vue-ontrack.git
cd vue-ontrack
yarn install
yarn dev
```

The dev server runs at http://localhost:5173.

## Scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Starts the Vite dev server |
| `yarn build` | Builds the app to `dist/` |
| `yarn preview` | Serves the production build locally |
| `yarn lint` | Runs ESLint and fixes what it can |
| `yarn format` | Formats `src` with Prettier |

## Project structure

```text
src/
  assets/       Tailwind entry, logo and empty state illustrations
  components/   timeline items and stopwatch, activity items and form, progress items, header, navigation, base button, icon and select
  composables/  stopwatch and progress calculations
  constants/    page names, button types, time constants and the icon registry
  modules/      activities and timeline state with their actions
  pages/        Timeline, Activities and Progress
  router/       hash-based navigation between the pages
  utils/        time formatting, ids, progress colors and select options
  validators/   prop and event validators
```

## Notes

- State lives in two plain modules, `src/modules/activities.js` and `src/modules/timelineItems.js`, built from Vue `ref` and `computed` and shared by every component that imports them.
- Navigation reads the page from the URL hash (`#timeline`, `#activities`, `#progress`). The pages are cached with `KeepAlive`, so a running stopwatch keeps counting while another page is open.
- Component props and emitted events are checked by validator functions from `src/validators/validators.js`.
- Data is kept in memory only: reloading the page resets the timeline and the activities.
