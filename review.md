# Music and Cocktails — Project Review

**Date:** March 25, 2026
**Project:** music-and-cocktails-front
**Live Site:** https://music-and-cocktails.firebaseapp.com/
**Backend API:** https://music-and-cocktails-api-1c87360d2e0b.herokuapp.com/

---

## Overview

Music and Cocktails is a React web application that pairs curated music albums with cocktail recipes. Users browse a visually styled catalog, click genre buttons to reveal album modals with flip-card animations, listen to Spotify previews, and view paired drink recipes. An admin panel allows content managers to edit albums, and add/edit/delete drinks.

The project is functional and well-organized for its scope. It demonstrates solid frontend thinking around layout, animations, and responsive design. The primary concerns are around code modernization, maintainability, and robustness.

---

## Technology Stack

| Area | Current | Notes |
|------|---------|-------|
| Framework | React 16.3.2 | Class components only; hooks introduced in 16.8 |
| Routing | React Router DOM 4.2.2 | Current stable is v6+ |
| UI | React Bootstrap 0.32.1 | Outdated version |
| Build tool | react-scripts 1.1.4 (CRA v1) | Very outdated; current CRA is 5.x, Vite is preferred |
| Testing | Cypress 2.1.0 | Very outdated version |
| Deployment | Firebase Hosting | Good choice |
| Styling | Vanilla CSS (separate files) | No preprocessor or CSS-in-JS |

All direct dependencies are significantly behind current versions and likely have outstanding security advisories.

---

## Strengths

### 1. Clean Component Organization
The project has a clear separation between page components (`Home`, `SplashPage`, `AdminPage`), feature components (`AlbumModal`, `UserAlbumCard`, `UserDrinkInfoCard`), and admin components. This makes navigating the codebase straightforward.

### 2. Responsive Design
The CSS uses media queries at logical breakpoints (940px, 800px, 640px, 500px, 470px, 440px) and adapts the layout meaningfully at each step. The flip-card modal correctly switches from hover-triggered to click-triggered on mobile.

### 3. Polished Visual Design
The dark theme with purple and green accents, parallax backgrounds, CSS kreep animation on genre buttons, and flip-card transitions give the app a cohesive, intentional aesthetic.

### 4. Working Spotify Integration
The `react-spotify-player` integration in `UserAlbumCard.jsx` gives users an in-page listening experience — a meaningful value-add to the core concept.

### 5. Functional Admin Panel
The admin panel covers the full CRUD lifecycle for drinks and partial editing for albums. The per-field form design with image previews is a thoughtful UX choice.

---

## Issues and Recommendations

### Critical

#### 1. Hardcoded API Base URL
The production API URL (`https://music-and-cocktails-api-1c87360d2e0b.herokuapp.com/`) is hardcoded in at least five files: `Home.jsx`, `AdminPage.jsx`, `AdminAlbums.jsx`, `AdminDrinks.jsx`, and `DrinkOptions.jsx`. Any URL change requires hunting down all occurrences.

**Fix:** Move to an environment variable in `.env`:
```
REACT_APP_API_BASE_URL=https://music-and-cocktails-api-1c87360d2e0b.herokuapp.com
```
Then reference `process.env.REACT_APP_API_BASE_URL` from a single `src/api.js` module.

#### 2. Silent API Failures
Most `catch` blocks only call `console.error(...)`. A failed fetch leaves the UI in a broken state with no feedback to the user.

**Fix:** Set an `error` state and display a user-facing message when data cannot be loaded.

---

### High Priority

#### 3. Legacy Class Components
All components use React class syntax. This is not broken, but it is a significant maintenance burden and makes adopting modern React patterns (hooks, concurrent features) harder.

**Fix:** Migrate to functional components with hooks incrementally, starting with stateless leaf components and working up.

#### 4. No Centralized State or API Service Layer
Each page component independently fetches the same data on mount. There is no caching, and navigating away and back triggers a full re-fetch.

**Fix:** Introduce a lightweight data-fetching layer (React Query, SWR, or even the Context API) to share and cache API results across the component tree.

#### 5. No Environment Configuration
The project has no `.env` file and no distinction between development and production API targets. Running locally always hits the production API.

**Fix:** Add `.env.development` and `.env.production` with the appropriate base URLs.

---

### Medium Priority

#### 6. Outdated Dependencies
react-scripts 1.1.4 is from 2018 and has numerous known CVEs. React 16.3 predates hooks (16.8). React Router 4 has breaking API changes from v6.

**Fix:** At minimum, run `npm audit` and address critical vulnerabilities. A full dependency upgrade is worthwhile before any further feature work.

#### 7. Unused Code
- `src/App.js` is never imported or used; `index.js` routes directly to components.
- Large blocks of commented-out code exist in `Header.jsx` (navigation buttons), `SplashPage.jsx` (Spotify auth flow), and several CSS files.

**Fix:** Delete `App.js`. Remove commented code — git history preserves it if needed.

#### 8. Missing Form Validation
Admin forms submit without client-side validation. Empty or malformed submissions reach the API.

**Fix:** Add required-field checks and URL format validation for image fields before calling `fetch`.

#### 9. Accessibility
- Interactive `<div>` elements with `onClick` handlers should be `<button>` elements.
- No ARIA labels on modals or dialogs.
- No keyboard navigation support (Escape to close modal, Tab through genre buttons).

**Fix:** Replace clickable divs with buttons, add `role` and `aria-*` attributes to modals, and ensure interactive elements are keyboard-reachable.

---

### Low Priority

#### 10. No PropTypes or TypeScript
There is no type checking at the component boundary. Passing the wrong shape of data to a component fails silently.

**Fix:** Add PropTypes to all components as a minimum. TypeScript migration is worthwhile for a project this size.

#### 11. Performance
- No image lazy loading (background images and album covers load eagerly).
- No code splitting (the entire app bundle loads on the splash page).
- No memoization on pure child components.

**Fix:** Add `loading="lazy"` to images, split routes with `React.lazy`, and wrap stable child components with `React.memo`.

#### 12. Test Coverage
Only one E2E test file exists with a single basic flow. `App.test.js` only checks that the component renders. There are no unit tests, no component tests, and no tests for error states.

**Fix:** Add tests for: album modal open/close, drink CRUD operations, error handling, and responsive behavior.

---

## Architecture Summary

```
index.js (Router)
├── Header.jsx
├── / → SplashPage.jsx
├── /home → Home.jsx
│   ├── HomePageGenres.jsx       (genre buttons + tooltips)
│   └── AlbumModal.jsx           (flip-card)
│       └── UserAlbumCard.jsx
│           ├── UserDrinkInfoCard.jsx
│           └── SpotifyPlayer (library)
└── /admin → AdminPage.jsx
    ├── AdminAlbums.jsx
    │   └── EditAlbum.jsx → DrinkOptions.jsx → DrinkInfoCard.jsx
    └── AdminDrinks.jsx
        ├── EditDrink.jsx
        └── AddDrink.jsx
```

Data flows top-down via props; mutations use callbacks passed to children. No global state.

---

## Prioritized Action Plan

| Priority | Action |
|----------|--------|
| 1 | Extract API base URL to environment variable |
| 2 | Add user-visible error handling on data fetch failures |
| 3 | Run `npm audit fix` for security vulnerabilities |
| 4 | Delete unused `App.js` and remove commented-out code |
| 5 | Add client-side form validation in admin panel |
| 6 | Replace clickable divs with semantic `<button>` elements |
| 7 | Migrate to functional components + hooks |
| 8 | Add React Query or SWR for data fetching and caching |
| 9 | Add PropTypes to all components |
| 10 | Expand test coverage (unit + additional E2E) |

---

## Conclusion

This is a well-conceived personal project with a clear identity and a polished visual presentation. The codebase is readable and consistently structured. The main gaps — hardcoded configuration, silent error handling, outdated dependencies, and minimal tests — are all straightforward to address incrementally. Tackling items 1–4 in the action plan above would meaningfully improve reliability and maintainability without requiring a full rewrite.
