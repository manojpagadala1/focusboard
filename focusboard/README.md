# FocusBoard

A responsive React task-management dashboard built with Vite. It demonstrates reusable React components, state-driven CRUD operations, search, combined filters, dynamic statistics, a three-slide Focus Notes carousel, and browser persistence with `localStorage`.

> Design note: the supplied written assignment was used as the implementation specification. The actual Figma file was not included with the project materials, so visual details are an original interpretation rather than a pixel-perfect Figma reproduction.

## Features

- Six starter tasks on first launch
- Create, edit and delete tasks (delete confirmation included)
- Status updates: To do, In progress and Completed
- Priority levels: Low, Medium and High
- Case-insensitive partial title search
- Combined status and priority filters, plus clear filters
- Dynamic total, in-progress, completed and completion-rate statistics
- Three manually navigable Focus Notes slides with previous/next and indicators
- Persistent task data using `localStorage` (`focusboard_tasks`)
- Responsive desktop, tablet and mobile layouts
- Accessible labels, semantic landmarks, keyboard-operable controls and visible focus styles

## Tech stack

React 18, Vite, JavaScript (ES modules), CSS, React Hooks, `localStorage`, and Lucide React icons.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

Vite writes the production build to `dist/`.

## Project structure

```text
focusboard/
├── public/
├── screenshots/
├── src/
│   ├── components/
│   │   ├── FocusNotes.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskList.jsx
│   ├── data/sampleTasks.js
│   ├── hooks/useLocalStorage.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── AI_USAGE.md
├── index.html
├── package.json
└── README.md
```

## State management

The app uses React's built-in `useState` for transient interface state (search text, selected filters, open form, selected task, mobile navigation and carousel slide). The task collection is managed by the reusable `useLocalStorage` hook, which initialises state from saved JSON when available and otherwise uses the six sample tasks. An effect writes each task-state change back to localStorage.

CRUD operations use immutable array updates: `map` to edit or update status, array prepend to create, and `filter` to delete. Statistics and visible tasks are derived from the source task array; filtered results are never persisted separately. `useMemo` recalculates the visible list when tasks or filters change.

## Deployment

### Vercel

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Select Vite (or use the defaults below).
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy and test the generated HTTPS URL.

### Netlify

Build command: `npm run build`; publish directory: `dist`.

## Links

- Live application: _Add your deployed HTTPS URL here._
- GitHub repository: _Add your public repository URL here._

## Testing checklist

- [ ] First visit shows six sample tasks.
- [ ] Create a task, refresh, and verify it remains.
- [ ] Edit a task, refresh, and verify updated values remain.
- [ ] Delete a task, refresh, and verify it stays deleted.
- [ ] Change a task's status and check statistics.
- [ ] Search using different letter cases and partial titles.
- [ ] Combine status and priority filters.
- [ ] Navigate all three carousel slides using arrows and dots.
- [ ] Test at 390px, 768px and 1440px viewport widths.
- [ ] Run `npm run build` and test the deployed URL.

## Known limitations

- Data is stored in the current browser's localStorage; it is not synchronised between devices or users.
- Calendar and Settings are visual navigation placeholders because those screens are outside the assignment scope.
- The exact supplied Figma frames should be used for final spacing, typography, colors and copy adjustments when available.
