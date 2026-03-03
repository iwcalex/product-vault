# Product Vault

A React Native app for browsing products from an external API, with category filtering and local favorites persistence.

## Tech stack

- React Native (Expo bare workflow)
- TypeScript
- React Navigation
- TanStack React Query
- AsyncStorage (favorites persistence)
- Jest + React Native Testing Library
- ESLint + Prettier

## Setup

```bash
yarn install
```

## Run

**Android:**

```bash
yarn android
```

or

```bash
npx expo run:android
```

The app is Android-focused for this assessment; iOS can be run with `yarn ios` or `npx expo run:ios` if the environment is configured.

## Test

```bash
yarn test
```

## Lint

```bash
yarn lint
```

Auto-fix where possible:

```bash
yarn lint --fix
```

## Architecture

- **API layer** (`src/api/products/`): Typed functions for fetching products, product by id, and categories. DummyJSON is used as the backend. No direct `fetch` in screens.

- **React Query hooks** (`src/hooks/`): `useProducts(category?)`, `useProduct(id)`, and `useCategories()` manage server state and caching. Screens use these hooks only.

- **Favorites context** (`src/context/favorites/`): Client state for favorite product IDs. A reducer handles `TOGGLE` and `SET`; AsyncStorage rehydrates on app start and persists on each change. No extra UI libraries for state.

- **Navigation** (`src/navigation/`): Stack navigator with typed params; screens are ProductList and ProductDetail.

## Notes

- Development and testing are Android-focused.
- No additional UI libraries beyond React Native core and Expo.
- Implementation followed a step-based plan (bootstrap, navigation, API, React Query, list/detail screens, favorites + persistence, tests, cleanup).
