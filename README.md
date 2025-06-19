# starwars-spa

This project is a Star Wars SPA built with Vue 3, Vite, TypeScript, Pinia, Vitest, and LESS.
It allows users to explore people and planets from the Star Wars API, with search, sorting, and pagination.

## Project Setup

```sh
git clone <your-repo-url>
cd starwars-spa
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Run Unit test and generate coverage

```sh
npm run test
npm run test:coverage
```

### Run e2e testing with playwright

```sh
npm run test:e2e
```

## ⚙️ GitHub Actions CI

This project includes a **GitHub Actions workflow** that runs automatically on **every push** to the `master` branch.

The workflow does:

- **Lint the code** with ESLint
- **Run unit tests** with Vitest
- **Run Playwright E2E tests**
- **Build the production bundle** to ensure the app compiles correctly

### Example workflow steps:

```bash
npm ci
npm run lint
npm run test
npx playwright install --with-deps
npm run test:e2e
npm run build
```

# Architectural decisions

This project follows these architectural choices:

State management: Uses Pinia with separate stores for people and planets.

Styling: Uses LESS with centralized variables and BEM naming convention for clarity and maintainability.

API abstraction: All data fetching is done via a fetchAllResources composable, powered by Axios.

Routing: Pagination state is synced via Vue Router query parameters.

Accessibility: ARIA labels, keyboard navigation, and color contrast are considered.
