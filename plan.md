# Music and Cocktails — Improvement Plan

**Date:** March 25, 2026

This document identifies concrete best-practice improvements across architecture, code quality, accessibility, testing, and tooling. Items are grouped by theme and ordered by priority within each group.

---

## 1. File Structure

The current flat layout makes it hard to navigate as the project grows. All components, styles, and utilities live together with no grouping by purpose.

**Current:**
```
src/
├── index.js
├── App.js                  ← unused
├── App.scss / App.css
├── Header.jsx
├── Footer.jsx
├── SplashPage.jsx
├── Home.jsx
├── HomePageGenres.jsx
├── AlbumModal.jsx
├── UserAlbumCard.jsx
├── UserDrinkInfoCard.jsx
├── LoadingScreen.jsx
├── registerServiceWorker.js
├── assets/
└── admin/
    ├── AdminPage.jsx
    ├── AdminAlbums.jsx
    ├── AdminDrinks.jsx
    ├── EditAlbum.jsx
    ├── EditDrink.jsx
    ├── AddDrink.jsx
    ├── DrinkOptions.jsx
    ├── DrinkInfoCard.jsx
    └── Admin.scss
```

**Proposed:**
```
src/
├── index.js                     ← entry point only
├── App.jsx                      ← router + top-level providers
│
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── common/
│   │   ├── LoadingScreen.jsx
│   │   └── ErrorBoundary.jsx    ← new
│   ├── album/
│   │   ├── AlbumModal.jsx
│   │   ├── HomePageGenres.jsx
│   │   ├── UserAlbumCard.jsx
│   │   └── UserDrinkInfoCard.jsx
│   └── admin/
│       ├── AdminPage.jsx
│       ├── AdminAlbums.jsx
│       ├── AdminDrinks.jsx
│       ├── DrinkOptions.jsx
│       ├── DrinkInfoCard.jsx
│       ├── EditAlbum.jsx
│       ├── EditDrink.jsx
│       └── AddDrink.jsx
│
├── pages/
│   ├── SplashPage.jsx
│   ├── HomePage.jsx
│   └── AdminPage.jsx            ← re-export or thin wrapper
│
├── services/
│   ├── api.js                   ← base fetch client (base URL, headers)
│   ├── albumService.js          ← getAlbums(), updateAlbum()
│   └── drinkService.js          ← getDrinks(), addDrink(), updateDrink(), deleteDrink()
│
├── hooks/
│   ├── useAlbums.js             ← fetch + state for albums
│   ├── useDrinks.js             ← fetch + state for drinks
│   └── useForm.js               ← generic controlled form state
│
├── utils/
│   ├── dataTransformers.js      ← parseIngredients(), findById()
│   └── constants.js             ← MESSAGE_TIMEOUT, Z_INDEX map, etc.
│
├── styles/
│   ├── _variables.scss          ← colors, breakpoints, spacing
│   ├── _mixins.scss             ← respond-to() mixin for breakpoints
│   ├── index.scss
│   ├── App.scss
│   ├── SplashPage.scss
│   ├── Header.scss
│   ├── Footer.scss
│   ├── AlbumModal.scss
│   └── Admin.scss
│
└── assets/
    ├── drink-headphones.png
    ├── record-collection-1.jpg
    └── music-cocktails-logo.png
```

**Key moves:**
- Delete `App.js` (unused)
- Move all SCSS into `src/styles/` so component folders contain only logic
- Group components by domain (`album/`, `admin/`, `layout/`, `common/`)
- Introduce `services/`, `hooks/`, `utils/` layers (see below)

---

## 2. API & Data Layer

**Problem:** The API base URL appears hardcoded in 5 files. Every fetch call re-implements the same headers and error pattern.

**Files affected:** `Home.jsx`, `AdminPage.jsx`, `AdminAlbums.jsx`, `AdminDrinks.jsx`, `DrinkOptions.jsx`

### 2a. Environment variable

Create `.env`:
```
REACT_APP_API_BASE_URL=https://music-and-cocktails-api-1c87360d2e0b.herokuapp.com
```

Create `.env.example` (committed to git) with the same key but no value, so other developers know what's needed.

### 2b. Central API client

`src/services/api.js`:
```js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options,
  });
  if (!response.ok) throw new Error(`API error ${response.status}`);
  return response.json();
}

export const get  = (path)         => request(path);
export const put  = (path, body)   => request(path, { method: 'PUT',    body: JSON.stringify(body) });
export const post = (path, body)   => request(path, { method: 'POST',   body: JSON.stringify(body) });
export const del  = (path)         => request(path, { method: 'DELETE' });
```

`src/services/albumService.js`:
```js
import * as api from './api';
export const getAlbums   = ()      => api.get('/albums');
export const updateAlbum = (album) => api.put(`/albums/${album.album_id}`, album);
```

`src/services/drinkService.js`:
```js
import * as api from './api';
export const getDrinks   = ()      => api.get('/drinks');
export const addDrink    = (drink) => api.post('/drinks', drink);
export const updateDrink = (drink) => api.put(`/drinks/${drink.drink_id}`, drink);
export const deleteDrink = (id)    => api.del(`/drinks/${id}`);
```

---

## 3. Known Bugs

These are confirmed bugs in the current code, not style issues.

| File | Issue |
|------|-------|
| `AddDrink.jsx:32` | `.then(() => this.props.getDrinks)` — missing `()`. The callback is referenced but never called, so the drinks list never refreshes after a successful add. Fix: `.then(() => this.props.getDrinks())` |
| `index.js:18` | `<footer />` (lowercase, self-closing) is invalid HTML and renders nothing. Should be the imported `<Footer />` component or removed entirely. |
| `HomePageGenres.jsx` | `genre` string used as React `key` in the album button map. Duplicate genres would cause React key collisions. Use `album.album_id` instead. |
| `DrinkOptions.jsx` | `.catch()` called with no handler — all fetch errors are silently swallowed. |
| `Home.jsx` | Two independent `setState` calls in `openModal` (lines 32–34) create two re-renders. Merge into one call. |
| `Home.jsx` | `userData` state is initialised and never updated or read. Should be removed. |
| `AlbumModal.jsx` | `userData` state is initialised and never used. Should be removed. |

---

## 4. Error Handling & User Feedback

Currently all `catch` blocks only call `console.error()`. Users see a broken or empty UI with no explanation.

**Pattern to adopt:**

```js
// In a functional component:
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

async function loadAlbums() {
  setLoading(true);
  setError(null);
  try {
    const data = await getAlbums();
    setAlbums(data);
  } catch (err) {
    setError('Could not load albums. Please try again.');
  } finally {
    setLoading(false);
  }
}
```

- Show a loading state before every async call (not just at page level)
- Show an inline error message when a call fails
- Show a success message (already partially done) on mutations — but use a shared utility so the 4-second timeout isn't repeated in every form component

**Add an `ErrorBoundary` component** (`src/components/common/ErrorBoundary.jsx`) to catch unexpected React render errors and show a fallback UI instead of a blank screen.

---

## 5. State Management & Component Patterns

### 5a. Convert class components to functions + hooks

All 16 components are class-based. React Hooks (introduced in 16.8) eliminate the need for classes in most cases and produce significantly less boilerplate. Migrate incrementally starting with leaf components (no children), then work upward.

Priority order (easiest first): `LoadingScreen` → `Footer` → `Header` → `UserDrinkInfoCard` → `UserAlbumCard` → `DrinkInfoCard` → `AlbumModal` → `DrinkOptions` → `HomePageGenres` → `Home` → admin components.

### 5b. Custom hooks to replace duplicated data-fetching state

```js
// src/hooks/useAlbums.js
export function useAlbums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    getAlbums()
      .then(setAlbums)
      .catch(() => setError('Failed to load albums'))
      .finally(() => setLoading(false));
  }, []);

  return { albums, loading, error };
}
```

This replaces the same `getAlbums` + `setState` + `componentDidMount` pattern duplicated in `Home.jsx` and `AdminPage.jsx`.

### 5c. Copying props to state is an anti-pattern

`EditAlbum.jsx` and `DrinkOptions.jsx` copy `this.props` into `this.state` in the constructor. When the parent re-renders with new props, state does not update. Use props directly for read-only values; only lift into state what the component actually needs to mutate.

---

## 6. SCSS — Variables & Mixins

Breakpoints and colours are hardcoded in multiple SCSS files. Add shared partials:

`src/styles/_variables.scss`:
```scss
// Breakpoints
$bp-sm:  440px;
$bp-md:  640px;
$bp-lg:  800px;
$bp-xl:  940px;

// Colours
$color-primary:      #7226c9;
$color-primary-dark: #561592;
$color-spotify:      #1DB954;
$color-nav-bg:       rgba(0, 0, 0, 0.85);
$color-text-light:   #f1f1f1;
$color-text-muted:   #56545c;
$color-border:       #7222a7;

// Z-index scale
$z-nav:     100;
$z-footer:  200;
$z-modal:   999;
$z-tooltip: 9999;
```

`src/styles/_mixins.scss`:
```scss
@use 'variables' as *;

@mixin respond-to($bp) {
  @media screen and (max-width: $bp) { @content; }
}
```

Usage:
```scss
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.nav-bar {
  z-index: $z-nav;
  background-color: $color-nav-bg;

  @include respond-to($bp-sm) { height: 3rem; }
}
```

---

## 7. Accessibility

The app has several hard accessibility violations:

| Issue | Location | Fix |
|-------|----------|-----|
| `<div onClick>` used as button | Header, SplashPage, HomePageGenres, Footer | Replace with `<button>` |
| `window.location =` instead of router nav | Header, Footer | Use React Router `<Link>` or `useNavigate` |
| No `role="dialog"` or `aria-modal` on modal | AlbumModal | Add `role="dialog" aria-modal="true" aria-label="Album details"` |
| No `role="tooltip"` on hover popup | HomePageGenres | Add `role="tooltip"` and `aria-describedby` linking |
| No keyboard handler alongside mouse events | All interactive divs | Add `onKeyDown` handling Enter/Space where `onClick` is used |
| Focus not trapped/restored on modal open/close | AlbumModal | Use a focus trap library or implement manually |
| Index used as React `key` in lists | UserDrinkInfoCard, DrinkInfoCard | Use stable IDs from data |

---

## 8. PropTypes

No component declares PropTypes. Add `prop-types` and annotate every component. Example:

```js
import PropTypes from 'prop-types';

AlbumModal.propTypes = {
  isOpen:     PropTypes.bool.isRequired,
  onClose:    PropTypes.func.isRequired,
  albumsData: PropTypes.arrayOf(PropTypes.shape({
    album_id:        PropTypes.number,
    album_title:     PropTypes.string,
    artist:          PropTypes.string,
    album_cover_url: PropTypes.string,
    spotify_album_id: PropTypes.string,
  })).isRequired,
  albumId: PropTypes.number,
};
```

This provides runtime warnings in development and serves as inline documentation.

---

## 9. Code Duplication to Extract

| Duplicated pattern | Appears in | Extract to |
|--------------------|-----------|-----------|
| API base URL + fetch headers | 5 files | `services/api.js` |
| Success message + 4-second timeout | `EditAlbum`, `EditDrink`, `AddDrink` | `utils/constants.js` + shared handler |
| `ingredients.split("; ")` | `UserDrinkInfoCard`, `DrinkInfoCard` | `utils/dataTransformers.js` |
| `.filter(item => item.id === selected)[0]` | `AlbumModal`, `DrinkInfoCard` | `utils/dataTransformers.js` |
| `componentDidMount` fetch pattern | 6 components | Custom hooks (`useAlbums`, `useDrinks`) |

---

## 10. Linting & Formatting

No ESLint config or Prettier config exists beyond the CRA default. Add:

```bash
npm install --save-dev prettier eslint-config-prettier
```

`.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

Add to `package.json` scripts:
```json
"lint":   "eslint src --ext .js,.jsx",
"format": "prettier --write src"
```

Optionally add Husky to run lint on pre-commit:
```bash
npm install --save-dev husky lint-staged
```

---

## 11. Testing

Current coverage: one smoke test (`App.test.js`) and one partially written Cypress file.

**Unit / component tests to add (React Testing Library):**
- `LoadingScreen` renders correctly
- `Header` navigates to home on logo click
- `AlbumModal` renders front face by default, shows back on hover/click
- `UserDrinkInfoCard` splits ingredients correctly
- Admin forms submit correct data shape

**Integration tests to add (Cypress):**
- Full user flow: visit home → click genre button → see modal → see drink details
- Admin flow: edit an album field and save → confirm success message
- Admin flow: add a drink → confirm it appears in the list
- Error state: API down → confirm error message shown (not blank screen)

---

## 12. Prioritised Roadmap

### Phase 1 — Bugs & Quick Wins (do now, no restructuring needed)
1. Fix `AddDrink.jsx` missing function call
2. Fix `<footer />` in `index.js`
3. Fix `HomePageGenres` React key
4. Add `.env` and `.env.example` with `REACT_APP_API_BASE_URL`
5. Create `src/services/api.js`, `albumService.js`, `drinkService.js` and replace all hardcoded fetch calls
6. Add empty catch handler at minimum to `DrinkOptions.jsx`
7. Remove unused state (`userData`) from `Home.jsx` and `AlbumModal.jsx`

### Phase 2 — Structure & Reliability
1. Move SCSS into `src/styles/` with `_variables.scss` and `_mixins.scss`
2. Reorganise components into `components/layout/`, `components/album/`, `components/admin/`, `components/common/`
3. Create `src/hooks/useAlbums.js` and `src/hooks/useDrinks.js`
4. Add `src/components/common/ErrorBoundary.jsx`
5. Add `loading` and `error` state to all data-fetching components
6. Add PropTypes to all components
7. Add `.prettierrc` and format the codebase

### Phase 3 — Modernisation
1. Convert class components to functional components + hooks (leaf-first)
2. Replace `window.location` navigation with React Router `<Link>` / `useNavigate`
3. Replace interactive `<div>` elements with `<button>` and fix keyboard handling
4. Add `role`, `aria-label`, and `aria-modal` attributes
5. Extract `utils/dataTransformers.js` and `utils/constants.js`
6. Add React Testing Library unit tests for key components

### Phase 4 — Future
1. Upgrade React Router from v5 to v6 (breaking API change — separate effort)
2. Upgrade React from v17 to v18 and switch to `createRoot`
3. Evaluate TypeScript migration
4. Add CI pipeline (GitHub Actions) running lint + tests on PR
