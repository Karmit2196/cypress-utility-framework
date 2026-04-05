# Cypress Utils Framework

[![npm version](https://img.shields.io/npm/v/cypress-utils-framework)](https://www.npmjs.com/package/cypress-utils-framework)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/Karmit2196/cypress-utils-framework/actions/workflows/ci.yml/badge.svg)](https://github.com/Karmit2196/cypress-utils-framework/actions/workflows/ci.yml)

A TypeScript utility library for Cypress test automation — 110+ typed utility methods available as plain functions or registered `cy.*` custom commands.

**Author: Karmit Lalani**

## Why This Exists

Cypress gives you powerful primitives but no opinions about structure. Teams end up writing `cy.request({ method: 'GET', url })` dozens of times, rolling their own wait helpers, and copy-pasting data factories across specs. This framework provides a consistent, typed, tested layer on top of Cypress so you write business logic in your tests — not boilerplate.

## Vanilla Cypress vs Framework

| Task | Vanilla Cypress | With Framework |
|---|---|---|
| Typed GET request | `cy.request({ method: 'GET', url: '/api/users' })` | `cy.getRequest<User[]>('/api/users')` |
| Wait for network idle | No built-in support | `cy.waitForNetworkIdle()` |
| Generate a test user | Manual object construction | `createUserData()` |
| Set localStorage | `cy.window().then(w => w.localStorage.setItem(k, v))` | `cy.setLocalStorage('key', 'val')` |
| Fill a form | Multiple chained `.get().type()` calls | `cy.fillForm({ '#email': 'x@y.com' })` |

## Installation

```bash
npm install cypress-utils-framework
```

## Quick Start

### Option 1 — Register as `cy.*` commands (recommended)

```typescript
// cypress/support/e2e.ts
import { extendCypressCommands } from 'cypress-utils-framework';
extendCypressCommands();
```

Then in tests:

```typescript
cy.visitAndWait('/login', '.login-form');
cy.fillForm({ '#username': 'alice', '#password': 's3cr3t' });
cy.clickAndWait('#submit', '.dashboard');
cy.waitForNetworkIdle();
```

### Option 2 — Import utility functions directly

```typescript
import { getRequest, createUserData, waitForElement } from 'cypress-utils-framework/utils';
import type { UserData } from 'cypress-utils-framework';

const user = createUserData() as UserData;

getRequest<User[]>('/api/users').then(res => {
  expect(res.status).to.eq(200);
});
```

---

## API Reference

### Navigation

| Function | Signature |
|---|---|
| `visitAndWait` | `(url: string, waitForSelector?: string) => Chainable<AUTWindow \| JQuery>` |
| `visitAndWaitForIdle` | `(url: string, timeout?: number) => Chainable<null>` |
| `reload` | `() => Chainable<AUTWindow>` |
| `goBack` | `() => Chainable<AUTWindow>` |
| `goForward` | `() => Chainable<AUTWindow>` |

### HTTP Requests

All request helpers are generic — pass a type parameter for a typed response body.

| Function | Signature |
|---|---|
| `getRequest<T>` | `(url: string, options?: Partial<Cypress.RequestOptions>) => Chainable<Cypress.Response<T>>` |
| `postRequest<T>` | `(url: string, body?: unknown, options?) => Chainable<Cypress.Response<T>>` |
| `putRequest<T>` | `(url: string, body?: unknown, options?) => Chainable<Cypress.Response<T>>` |
| `deleteRequest<T>` | `(url: string, options?) => Chainable<Cypress.Response<T>>` |
| `patchRequest<T>` | `(url: string, body?: unknown, options?) => Chainable<Cypress.Response<T>>` |
| `requestWithToken<T>` | `(method, url, token: string, data?) => Chainable<Cypress.Response<T>>` |
| `requestWithHeaders<T>` | `(method, url, data?, headers?) => Chainable<Cypress.Response<T>>` |

Backwards-compatible aliases: `getData`, `postData`, `updateData`, `deleteData`, `makeRequest`.

Response assertion helpers: `hasStatus`, `hasSucceeded`, `hasFailed`, `isArray`, `isObject`, `containsData`, `getResponseData`.

### Element Interactions

| Function | Signature |
|---|---|
| `waitForElement` | `(selector: string, timeout?: number) => Chainable<JQuery<HTMLElement>>` |
| `waitForElementExist` | `(selector: string, timeout?: number) => Chainable<JQuery<HTMLElement>>` |
| `assertText` | `(selector: string, expected: string) => Chainable<JQuery<HTMLElement>>` |
| `assertElementVisible` | `(selector: string) => Chainable<JQuery<HTMLElement>>` |
| `assertElementNotVisible` | `(selector: string) => Chainable<JQuery<HTMLElement>>` |
| `clickAndWait` | `(selector: string, waitFor?: string) => Chainable<JQuery<HTMLElement>>` |
| `fillForm` | `(formData: Record<string, string>) => Chainable<null>` |
| `clearAndType` | `(selector: string, text: string) => Chainable<JQuery<HTMLElement>>` |
| `typeSlowly` | `(selector: string, text: string, delay?: number) => Chainable<JQuery<HTMLElement>>` |
| `selectOption` | `(selector: string, value: string) => Chainable<JQuery<HTMLElement>>` |
| `dragTo` | `(fromSelector: string, toSelector: string) => Chainable<JQuery<HTMLElement>>` |
| `uploadFile` | `(selector: string, filePath: string) => Chainable<JQuery<HTMLElement>>` |
| `hoverOver` / `rightClick` / `doubleClick` | `(selector: string) => Chainable<JQuery<HTMLElement>>` |

### Keyboard & Clipboard

| Function | Signature |
|---|---|
| `pressKey` | `(selector: string, key: string) => Chainable<JQuery<HTMLElement>>` |
| `pressKeySequence` | `(selector: string, keys: string[]) => Chainable<JQuery<HTMLElement>>` |
| `selectAllText` | `(selector: string) => Chainable<JQuery<HTMLElement>>` |
| `selectTextRange` | `(selector: string, start: number, end: number) => Chainable<JQuery<HTMLElement>>` |
| `copyToClipboard` | `(selector: string) => Chainable<JQuery<HTMLElement>>` |
| `pasteFromClipboard` | `(selector: string) => Chainable<JQuery<HTMLElement>>` |
| `undoAction` / `redoAction` | `(selector: string) => Chainable<JQuery<HTMLElement>>` |

### Element State Assertions

| Function | Signature |
|---|---|
| `isVisible` / `isHidden` | `(selector: string) => Chainable<JQuery<HTMLElement>>` |
| `isEnabled` / `isDisabled` | `(selector: string) => Chainable<JQuery<HTMLElement>>` |
| `isChecked` / `isUnchecked` | `(selector: string) => Chainable<JQuery<HTMLElement>>` |
| `isRequired` | `(selector: string) => Chainable<JQuery<HTMLElement>>` |
| `hasAttribute` | `(selector: string, attr: string, value?: string) => Chainable<JQuery<HTMLElement>>` |
| `hasClass` | `(selector: string, className: string) => Chainable<JQuery<HTMLElement>>` |
| `hasCSSProperty` | `(selector: string, property: string, value: string) => Chainable<JQuery<HTMLElement>>` |

### Smart Waits

| Function | Signature |
|---|---|
| `waitForText` | `(selector: string, text: string, timeout?: number) => Chainable<JQuery<HTMLElement>>` |
| `waitForNoText` | `(selector: string, text: string, timeout?: number) => Chainable<JQuery<HTMLElement>>` |
| `waitForElementCount` | `(selector: string, count: number, timeout?: number) => Chainable<JQuery<HTMLElement>>` |
| `waitForEmpty` / `waitForNotEmpty` | `(selector: string, timeout?: number) => Chainable<JQuery<HTMLElement>>` |
| `waitForReady` | `(selector: string, timeout?: number) => Chainable<JQuery<HTMLElement>>` |
| `waitForPageReady` | `(timeout?: number) => Chainable<null>` |

### Network

| Function | Signature |
|---|---|
| `waitForNetworkIdle` | `(timeout?: number) => Chainable<null>` |
| `waitForNetworkIdleWithOptions` | `(options?: NetworkIdleOptions) => Chainable<null>` |
| `waitForAllRequests` | `(timeout?: number) => Chainable<null>` |
| `interceptNetworkRequest` | `(method: string, url: string, response: unknown) => Chainable<null>` |
| `waitForNetworkRequest` | `(method: string, url: string, timeout?: number) => Chainable<unknown>` |

`waitForNetworkIdle` uses `cy.intercept` to track in-flight requests via a closure counter and polls until the count reaches zero — no hardcoded sleeps.

### Storage

| Function | Signature |
|---|---|
| `setLocalStorage` | `(key: string, value: string) => Chainable<null>` |
| `getLocalStorage` | `(key: string) => Chainable<string \| null>` |
| `removeLocalStorage` | `(key: string) => Chainable<null>` |
| `hasLocalStorageKey` | `(key: string) => Chainable<boolean>` |
| `getLocalStorageKeys` | `() => Chainable<string[]>` |
| `setMultipleLocalStorage` | `(data: Record<string, string>) => Chainable<null>` |
| `setSessionStorage` | `(key: string, value: string) => Chainable<null>` |
| `getSessionStorage` | `(key: string) => Chainable<string \| null>` |
| `clearSessionStorage` | `() => Chainable<null>` |

### Test Data Generators

All generators return a single object when called with no argument, or an array when `count > 1`.

| Function | Returns |
|---|---|
| `createUserData(count?)` | `UserData \| UserData[]` — `{ firstName, lastName, email, phone, username, password }` |
| `createAddressData(count?)` | `AddressData \| AddressData[]` — `{ street, city, state, zipCode, country }` |
| `createProductData(count?)` | `ProductData \| ProductData[]` — `{ name, price, category, inStock, description }` |
| `createOrderData(count?)` | `OrderData \| OrderData[]` — `{ orderNumber, customerName, total, status, orderDate }` |
| `createRandomEmail()` | `string` |
| `createRandomString(length?)` | `string` |
| `createRandomPhone()` | `string` |
| `createRandomDate(startYear?, endYear?)` | `Date` |
| `createRandomNumbers(count, min?, max?)` | `number[]` |
| `createRandomBoolean()` | `boolean` |
| `createRandomColor()` | `string` |
| `createTestData(template, count?)` | `Record<string, unknown> \| Record<string, unknown>[]` |

---

## Usage Examples

### Typed API requests

```typescript
interface User { id: number; name: string; email: string; }

cy.getRequest<User[]>('/api/users').then(res => {
  expect(res.status).to.eq(200);
  expect(res.body[0].name).to.be.a('string');
});

cy.postRequest<User>('/api/users', { name: 'Alice' }).then(res => {
  expect(res.body.id).to.be.a('number');
});
```

### Waiting for network idle

```typescript
// After navigation, wait until all in-flight XHR/fetch requests finish
cy.visitAndWait('/dashboard', '.page-loaded');
cy.waitForNetworkIdle(10000);
cy.assertText('.user-count', '42');
```

### Test data generation

```typescript
import { createUserData, createProductData } from 'cypress-utils-framework/utils';
import type { UserData, ProductData } from 'cypress-utils-framework';

const user = createUserData() as UserData;
const [p1, p2] = createProductData(2) as ProductData[];
```

### localStorage helpers

```typescript
cy.setLocalStorage('auth_token', 'abc123');
cy.getLocalStorage('auth_token').then(val => {
  expect(val).to.eq('abc123');
});
cy.hasLocalStorageKey('auth_token').then(exists => {
  expect(exists).to.be.true;
});
```

---

## Development

```bash
npm install          # install deps
npm run type-check   # TypeScript type check
npm run lint         # ESLint
npm test             # Vitest unit tests (73 tests)
npm run build        # compile to dist/
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Add tests for new utilities in `test-suite/`
4. Ensure all checks pass: `npm run type-check && npm run lint && npm test`
5. Open a pull request against `main`

See [CHANGELOG.md](CHANGELOG.md) for version history.

## License

MIT © Karmit Lalani
