# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a published npm package (`cypress-utils-framework`) — a TypeScript utility library for Cypress test automation. It provides 110+ utility methods that consumers can use either as plain functions or as registered Cypress custom commands.

## Commands

```bash
npm run build        # Compile via tsup to dist/ (runs clean first)
npm run dev          # Watch mode
npm run lint         # ESLint on src/
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier on src/
npm run type-check   # tsc --noEmit (no emit, type errors only)
```

There is no test runner configured in this repo. The `example-usage/` directory contains sample Cypress specs showing intended usage but is not wired to a test script.

## Architecture

The package has three export entry points (see [tsup.config.ts](tsup.config.ts)):

| Entry | Purpose |
|---|---|
| `src/index.ts` | Root — re-exports everything plus default object |
| `src/commands/index.ts` | Registers all utils as `cy.*` custom commands |
| `src/utils/index.ts` | Pure utility functions (no Cypress command registration) |

### Two usage modes

**Functional** — import and call directly:
```ts
import { waitForElement, postRequest } from 'cypress-utils-framework/utils';
```

**Command extension** — register once in `cypress/support/e2e.ts`:
```ts
import { extendCypressCommands } from 'cypress-utils-framework';
extendCypressCommands();
// then use cy.waitForElement(), cy.postRequest(), etc.
```

### Source layout

```
src/
  types/index.ts       — All shared TypeScript interfaces and types
  utils/
    elements.ts        — DOM interaction, assertions, keyboard, clipboard, smart waits
    navigation.ts      — Page navigation helpers
    network.ts         — Network idle / request interception
    requests.ts        — HTTP request helpers (GET/POST/PUT/DELETE/PATCH + auth variants)
    storage.ts         — localStorage / sessionStorage helpers
    testData.ts        — Random data generators (users, addresses, products, orders)
    index.ts           — Re-exports all utils
  commands/index.ts    — Declares Cypress namespace extensions + maps utils to cy.* commands
  index.ts             — Root entry point
```

### Adding a new utility

1. Implement the function in the appropriate `src/utils/*.ts` file.
2. Export it — `src/utils/index.ts` already wildcard-exports everything.
3. Add the `cy.*` type declaration to the `Cypress.Chainable` interface in [src/commands/index.ts](src/commands/index.ts).
4. Register it with `Cypress.Commands.add(...)` in `extendCypressCommands()` in the same file.

No changes to `src/utils/index.ts` or `src/index.ts` are needed for new utils; only `src/commands/index.ts` requires manual additions for each new command.

## Build output

`tsup` produces both CJS and ESM formats with `.d.ts` declarations and sourcemaps in `dist/`. The `cypress` package is marked `external` and never bundled. `minify` is intentionally off — keep it off for debuggability.
