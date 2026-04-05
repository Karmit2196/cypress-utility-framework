# Cypress Utils Framework — Complete Documentation

**Package:** `cypress-utils-framework`  
**Version:** 1.6.0  
**Author:** Karmit Lalani  
**License:** MIT

---

## Table of Contents

1. [Overview](#overview)
2. [Installation & Setup](#installation--setup)
3. [Architecture](#architecture)
4. [Usage Modes](#usage-modes)
5. [Module Reference](#module-reference)
   - [Navigation Utilities](#navigation-utilities)
   - [Element Utilities](#element-utilities)
   - [Request Utilities](#request-utilities)
   - [Network Utilities](#network-utilities)
   - [Storage Utilities](#storage-utilities)
   - [Test Data Utilities](#test-data-utilities)
6. [TypeScript Types](#typescript-types)
7. [Build System](#build-system)
8. [Example Usage](#example-usage)

---

## Overview

`cypress-utils-framework` is a published npm package — a TypeScript utility library for Cypress test automation. It provides **110+ utility methods** that consumers can use either as **plain functions** (functional style) or as **registered Cypress custom commands** (`cy.*` style).

The framework is designed to:
- Eliminate boilerplate in Cypress tests
- Provide consistent, reusable patterns for common test operations
- Support full TypeScript with typed interfaces for all data structures
- Ship both CommonJS and ESM formats for maximum compatibility

---

## Installation & Setup

### Install the package

```bash
npm install cypress-utils-framework
```

**Peer dependency:** Cypress >= 10.0.0 must already be installed in your project.

### Option A — Functional imports (no registration needed)

```ts
import { waitForElement, postRequest, createUserData } from 'cypress-utils-framework/utils';
```

Call the functions directly in your tests. No setup required.

### Option B — Cypress custom commands (`cy.*`)

Register once in `cypress/support/e2e.ts`:

```ts
import { extendCypressCommands } from 'cypress-utils-framework';
extendCypressCommands();
```

After registration, all utilities are available as `cy.waitForElement()`, `cy.postRequest()`, etc.

---

## Architecture

The package has **three export entry points**, configured in `tsup.config.ts`:

| Import path | Purpose |
|---|---|
| `cypress-utils-framework` | Root — re-exports everything + default object + `extendCypressCommands` |
| `cypress-utils-framework/commands` | Registers all utils as `cy.*` custom commands |
| `cypress-utils-framework/utils` | Pure utility functions only (no command registration) |

### Source Layout

```
src/
  types/index.ts         — All shared TypeScript interfaces and types
  utils/
    elements.ts          — DOM interaction, assertions, keyboard, clipboard, smart waits
    navigation.ts        — Page navigation helpers
    network.ts           — Network idle / request interception
    requests.ts          — HTTP request helpers (GET/POST/PUT/DELETE/PATCH + auth variants)
    storage.ts           — localStorage / sessionStorage helpers
    testData.ts          — Random data generators (users, addresses, products, orders)
    index.ts             — Re-exports all utils (wildcard)
  commands/index.ts      — Declares Cypress namespace extensions + maps utils to cy.* commands
  index.ts               — Root entry point
```

### How Command Registration Works

`extendCypressCommands()` in `src/commands/index.ts` does two things:

1. **Declares types** — extends the `Cypress.Chainable` interface in the global `Cypress` namespace so TypeScript knows about all `cy.*` commands.
2. **Registers commands** — calls `Cypress.Commands.add(commandName, utilFunction)` for every utility.

### Adding a New Utility

1. Implement the function in the appropriate `src/utils/*.ts` file.
2. It is automatically exported via the wildcard in `src/utils/index.ts`.
3. Add a type declaration to `Cypress.Chainable` in `src/commands/index.ts`.
4. Register it with `Cypress.Commands.add(...)` in `extendCypressCommands()`.

No changes to `src/utils/index.ts` or `src/index.ts` are needed.

---

## Usage Modes

### Functional Mode

```ts
import { waitForElement, fillForm, createUserData } from 'cypress-utils-framework/utils';
import type { UserData } from 'cypress-utils-framework';

it('login test', () => {
  const user = createUserData() as UserData;
  fillForm({ '#username': user.username, '#password': user.password });
  waitForElement('.dashboard');
});
```

### Command Extension Mode

```ts
// cypress/support/e2e.ts
import { extendCypressCommands } from 'cypress-utils-framework';
extendCypressCommands();

// In your spec file
it('login test', () => {
  cy.visitAndWait('/login', '.login-form');
  cy.fillForm({ '#username': 'admin', '#password': 'secret' });
  cy.clickAndWait('#login-button', '.dashboard');
});
```

---

## Module Reference

### Navigation Utilities

File: `src/utils/navigation.ts`

| Function | Signature | Description |
|---|---|---|
| `visit` | `(url, options?) => Chainable` | Visit a URL with optional Cypress visit options |
| `visitAndWait` | `(url, waitForSelector?) => Chainable` | Visit a page and wait for a selector to appear |
| `visitAndWaitForIdle` | `(url, timeout?) => Chainable` | Visit a page and wait for network to be idle |
| `reload` | `() => Chainable` | Reload the current page |
| `goBack` | `() => Chainable` | Navigate back (browser history) |
| `goForward` | `() => Chainable` | Navigate forward (browser history) |

**cy.* equivalents:** `cy.visitAndWait`, `cy.visitAndWaitForIdle`, `cy.reloadPage`, `cy.goBack`, `cy.goForward`

---

### Element Utilities

File: `src/utils/elements.ts`

This is the largest module. It is split into basic element utilities and enhanced UI interactions.

#### Basic Element Operations

| Function | Description |
|---|---|
| `waitForElement(selector, timeout?)` | Wait for element to be present and visible (default 10s) |
| `waitForElementExist(selector, timeout?)` | Wait for element to exist in DOM (may not be visible) |
| `waitForElementWithOptions(selector, options?)` | Wait with custom `ElementWaitOptions` (timeout, visible, exist flags) |
| `assertText(selector, expectedText)` | Assert element contains expected text |
| `assertElementVisible(selector)` | Assert element is visible |
| `assertElementNotVisible(selector)` | Assert element is not visible |
| `clickAndWait(selector, waitFor?)` | Click element, optionally wait for another element |
| `fillForm(formData)` | Fill multiple fields from a `{selector: value}` map |
| `scrollToElement(selector)` | Scroll element into view |
| `takeScreenshot(name?)` | Capture a screenshot with optional name |

#### Enhanced UI Interactions

| Function | Description |
|---|---|
| `dragTo(fromSelector, toSelector)` | Drag-and-drop simulation using mouse events |
| `scrollTo(selector)` | Scroll element into view (alias) |
| `clickAll(selectors[])` | Click a list of selectors in order |
| `uploadFile(selector, filePath)` | Upload a file via `cy.selectFile` |
| `waitForReady(selector, timeout?)` | Wait for element to be visible AND not disabled |
| `fillFormData(formData)` | Fill form fields (alias of `fillForm`) |
| `waitForLoading(spinnerSelector?)` | Wait for loading spinner to disappear |
| `containsText(selector, text)` | Assert element contains text |
| `isVisible(selector)` | Assert element is visible |
| `isHidden(selector)` | Assert element is not visible |
| `clickAndWaitFor(clickSelector, waitSelector, timeout?)` | Click then wait for result |
| `waitForPageReady(timeout?)` | Wait for `document.readyState === 'complete'` |
| `isChecked(selector)` | Assert checkbox is checked |
| `isUnchecked(selector)` | Assert checkbox is unchecked |
| `selectOption(selector, value)` | Select a dropdown option by value |
| `typeSlowly(selector, text, delay?)` | Type with configurable delay per keypress |
| `clearAndType(selector, text)` | Clear field then type new text |
| `hoverOver(selector)` | Trigger mouseover event |
| `rightClick(selector)` | Right-click an element |
| `doubleClick(selector)` | Double-click an element |

#### Focus & Keyboard Operations

| Function | Description |
|---|---|
| `focusElement(selector)` | Focus an element |
| `blurElement(selector)` | Remove focus from element |
| `pressKey(selector, key)` | Press a single key (e.g. `'enter'`, `'tab'`) |
| `pressKeySequence(selector, keys[])` | Press a sequence of keys in order |
| `selectAllText(selector)` | Select all text in input (`Ctrl+A` equivalent) |
| `selectTextRange(selector, start, end)` | Set a text selection range via `setSelectionRange` |

#### Clipboard Operations

| Function | Description |
|---|---|
| `copyToClipboard(selector)` | Simulate Ctrl+C on an element |
| `pasteFromClipboard(selector)` | Simulate Ctrl+V on an element |
| `undoAction(selector)` | Simulate Ctrl+Z on an element |
| `redoAction(selector)` | Simulate Ctrl+Y on an element |

#### State & Attribute Assertions

| Function | Description |
|---|---|
| `toggleElement(selector)` | Click to toggle state (checkbox, switch) |
| `isEnabled(selector)` | Assert element is enabled |
| `isDisabled(selector)` | Assert element is disabled |
| `isRequired(selector)` | Assert element has `required` attribute |
| `hasAttribute(selector, attr, value?)` | Assert element has attribute (optionally with value) |
| `hasClass(selector, className)` | Assert element has CSS class |
| `hasCSSProperty(selector, property, value)` | Assert element has specific CSS property value |

#### Smart Wait Utilities

| Function | Description |
|---|---|
| `waitForText(selector, text, timeout?)` | Wait for element to contain text |
| `waitForNoText(selector, text, timeout?)` | Wait for element to NOT contain text |
| `waitForElementCount(selector, count, timeout?)` | Wait for exact number of matching elements |
| `waitForEmpty(selector, timeout?)` | Wait for element to be empty |
| `waitForNotEmpty(selector, timeout?)` | Wait for element to not be empty |

---

### Request Utilities

File: `src/utils/requests.ts`

All request functions return `Chainable<Cypress.Response<T>>` and wrap `cy.request`.

#### HTTP Method Wrappers

| Function | Description |
|---|---|
| `getRequest(url, options?)` | HTTP GET |
| `postRequest(url, body?, options?)` | HTTP POST |
| `putRequest(url, body?, options?)` | HTTP PUT |
| `deleteRequest(url, options?)` | HTTP DELETE |
| `patchRequest(url, body?, options?)` | HTTP PATCH |
| `request(method, url, body?, options?)` | Arbitrary HTTP method |

**Aliases (backwards-compatible):** `getData`, `postData`, `updateData`, `deleteData`, `makeRequest`

#### Advanced Request Helpers

| Function | Description |
|---|---|
| `requestWithHeaders(method, url, data?, headers?)` | Request with custom headers object |
| `requestWithToken(method, url, token, data?)` | Request with Bearer Authorization token |
| `requestAndWait(method, url, data?, options?)` | Request that waits for completion |
| `waitForRequest(method, url, timeout?)` | Wait for a previously intercepted+aliased request |
| `interceptRequest(method, url, response)` | Intercept and stub a request |
| `mockRequest` | Alias for `interceptRequest` |

#### Response Assertions

| Function | Description |
|---|---|
| `hasStatus(response, status)` | Assert response has specific HTTP status code |
| `hasSucceeded(response)` | Assert status < 400 |
| `hasFailed(response)` | Assert status > 399 |
| `containsData(response, key, value)` | Assert response body key equals value |
| `isArray(response)` | Assert response body is an array |
| `isObject(response)` | Assert response body is an object |
| `getResponseData(response, key?)` | Extract key (or full body) from response |

---

### Network Utilities

File: `src/utils/network.ts`

These utilities manage network-level synchronization in tests.

| Function | Description |
|---|---|
| `waitForNetworkIdle(timeout?)` | Wait until all in-flight requests complete |
| `waitForNetworkIdleWithOptions(options)` | Network idle with debounce (`minIdleTime`) and pending threshold (`maxPendingRequests`) |
| `waitForNetworkRequest(method, url, timeout?)` | Wait for a previously aliased intercepted request |
| `interceptNetworkRequest(method, url, response)` | Intercept and stub a network request |
| `interceptMultipleRequests(interceptions[])` | Stub multiple requests in one call |
| `waitForAllRequests(timeout?)` | Wait for all observed in-flight requests to finish; resolves immediately if no requests seen within 500ms |

**How `waitForNetworkIdle` works internally:**

A catch-all `cy.intercept('**')` registers a closure counter. Each request increments the counter; each response decrements it. A polling loop checks every 100ms until the counter reaches zero or the timeout is exceeded.

**`NetworkIdleOptions`:**
- `timeout` — max wait time in ms (default 10000)
- `minIdleTime` — how long the network must stay idle before resolving (default 500ms)
- `maxPendingRequests` — tolerated number of pending requests before considering idle (default 0)

---

### Storage Utilities

File: `src/utils/storage.ts`

#### localStorage

| Function | Description |
|---|---|
| `clearLocalStorage()` | Clear all localStorage |
| `setLocalStorage(key, value)` | Set a localStorage key |
| `getLocalStorage(key)` | Get a localStorage value |
| `removeLocalStorage(key)` | Remove a specific key |
| `hasLocalStorageKey(key)` | Check if a key exists |
| `getLocalStorageKeys()` | Get all keys as an array |
| `getLocalStorageSize()` | Get number of stored entries |
| `setMultipleLocalStorage(data)` | Set multiple key-value pairs at once |
| `getAllLocalStorage()` | Get all key-value pairs as an object |

#### sessionStorage

| Function | Description |
|---|---|
| `clearSessionStorage()` | Clear all sessionStorage |
| `setSessionStorage(key, value)` | Set a sessionStorage key |
| `getSessionStorage(key)` | Get a sessionStorage value |
| `removeSessionStorage(key)` | Remove a specific key |
| `hasSessionStorageKey(key)` | Check if a key exists |

All storage utilities access `cy.window()` to interact with the browser's storage APIs.

---

### Test Data Utilities

File: `src/utils/testData.ts`

These generate randomized test data for use in test fixtures, API payloads, and form filling.

#### Core Generator

| Function | Description |
|---|---|
| `createTestData(template, count?)` | Generate data from a template object. Values can be static or factory functions. Returns single object or array based on `count`. |
| `createDataWithValues(values)` | Return a shallow copy of the provided values |
| `createDataWithOverrides(baseTemplate, overrides)` | Generate data from a base template and merge overrides on top |

#### Primitive Generators

| Function | Description |
|---|---|
| `createRandomEmail()` | `test.{timestamp}.{random}@example.com` |
| `createRandomString(length?)` | Random alphanumeric string (default length 8) |
| `createRandomPhone()` | `XXX-XXX-XXXX` format |
| `createRandomDate(startYear?, endYear?)` | Random Date between start and end year |
| `createRandomNumbers(count, min?, max?)` | Array of random integers |
| `createRandomColor()` | One of: red, blue, green, yellow, purple, orange, pink, brown |
| `createRandomBoolean()` | `Math.random() > 0.5` |

#### Structured Data Generators

| Function | Returns |
|---|---|
| `createUserData(count?)` | `UserData` or `UserData[]` — firstName, lastName, email, phone, username, password |
| `createAddressData(count?)` | `AddressData` or `AddressData[]` — street, city, state, zipCode, country |
| `createProductData(count?)` | `ProductData` or `ProductData[]` — name, price, category, inStock, description |
| `createOrderData(count?)` | `OrderData` or `OrderData[]` — orderNumber, customerName, total, status, orderDate |

**Template pattern example:**

```ts
const user = createTestData({
  username: () => `user_${Math.random()}`,
  role: 'admin',               // static value
  createdAt: createRandomDate, // function reference
});
```

---

## TypeScript Types

File: `src/types/index.ts`

All types are exported from the root entry point.

### Data Structure Types

| Type | Fields |
|---|---|
| `UserData` | `firstName, lastName, email, phone, username, password` |
| `AddressData` | `street, city, state, zipCode, country` |
| `ProductData` | `name, price, category, inStock, description` |
| `OrderData` | `orderNumber, customerName, total, status, orderDate` |

### Options Types

| Type | Purpose |
|---|---|
| `ElementWaitOptions` | `timeout, retryInterval, visible, exist` |
| `NetworkIdleOptions` | `timeout, minIdleTime, maxPendingRequests` |
| `StorageOptions` | Cookie/storage metadata |
| `CookieOptions` | Cookie-specific options |
| `FormData` | `{[selector]: value}` map |
| `FormFieldOptions` | `clear, delay, force` |
| `ElementOptions` | `timeout, force, multiple, withinSubject` |
| `ScrollOptions` | `duration, easing, offset` |
| `ScreenshotOptions` | `name, capture, clip, disableTimersAndAnimations` |
| `FileUploadOptions` | `force, action` |
| `AssertionOptions` | `timeout, retryInterval, message` |
| `CypressUtilsConfig` | Global framework configuration shape |

### Key/Enum Types

| Type | Values |
|---|---|
| `KeyboardKey` | `enter, tab, space, escape, backspace, delete, up, down, left, right, home, end, pageup, pagedown, ctrl, alt, shift, meta, cmd, command, win, windows` |
| `MouseButton` | `left, right, middle` |
| `DeviceType` | `mobile, tablet, desktop` |

### Response / API Types

| Type | Purpose |
|---|---|
| `ApiResponse<T>` | `status, statusText, headers, body, duration` |
| `NetworkRequest` | `method, url, headers?, body?, timeout?` |
| `RequestOptions` | Alias for `Partial<Cypress.RequestOptions>` |

### Utility / Helper Types

| Type | Purpose |
|---|---|
| `Chainable<T>` | Alias for `Cypress.Chainable<T>` |
| `UtilityResult<T>` | `Chainable<T>` |
| `DataRecord` | `Record<string, unknown>` |
| `DataArray` | `unknown[]` |
| `DataValue` | `string | number | boolean | null | undefined` |
| `ValidationRule` | Field validation definition |
| `ValidationResult` | `isValid, errors[]` |
| `ValidationError` | `field, message, value?` |
| `WaitCondition` | `condition fn, timeout, interval, message` |
| `CustomEvent` | `type, detail?, bubbles?, cancelable?` |
| `PerformanceMetrics` | LCP, FID, CLS and other Core Web Vitals |
| `AccessibilityOptions` | `include, exclude, rules, tags` |
| `CypressUtilsError` | `Error + code, context?, selector?, timeout?` |

---

## Build System

**Tool:** `tsup` (wraps esbuild)

**Output:** `dist/` — both CJS and ESM formats, `.d.ts` type declarations, sourcemaps.

Key configuration decisions:
- `minify: false` — kept off intentionally for debuggability
- `cypress` is marked as `external` — never bundled into the output
- Three entry points: `src/index.ts`, `src/commands/index.ts`, `src/utils/index.ts`

### Available Scripts

| Command | What it does |
|---|---|
| `npm run build` | Run `clean` then compile via tsup to `dist/` |
| `npm run dev` | Watch mode — recompile on file changes |
| `npm run lint` | ESLint on `src/` |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm run format` | Prettier on `src/**/*.ts` |
| `npm run type-check` | `tsc --noEmit` — type errors only, no output |

**Requirements:** Node >= 16, npm >= 8

---

## Example Usage

### Login Test

```ts
import { createUserData } from 'cypress-utils-framework/utils';
import type { UserData } from 'cypress-utils-framework';

describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visitAndWait('/login', '.login-form');
  });

  it('should fill and submit login form', () => {
    const userData = createUserData() as UserData;

    cy.fillForm({
      '#username': userData.username,
      '#password': userData.password,
    });

    cy.clickAndWait('#login-button', '.dashboard');
    cy.url().should('include', '/dashboard');
  });
});
```

### API Test

```ts
describe('API Tests', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  it('should create and validate a new user', () => {
    cy.postRequest(`${baseUrl}/users`, { name: 'Test User' })
      .then(response => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
      });
  });

  it('should handle errors gracefully', () => {
    cy.getRequest(`${baseUrl}/invalid-endpoint`)
      .then(response => {
        expect(response.status).to.be.greaterThan(399);
      });
  });
});
```

### Network Idle + Storage

```ts
it('should wait for all data to load and verify token', () => {
  cy.visitAndWaitForIdle('/dashboard', 15000);
  cy.getLocalStorage('authToken').then(token => {
    expect(token).to.not.be.null;
  });
  cy.waitForText('.user-count', 'Total: 42');
});
```

### Test Data Generation

```ts
import { createUserData, createAddressData } from 'cypress-utils-framework/utils';

it('should submit checkout form', () => {
  const user = createUserData() as UserData;
  const address = createAddressData() as AddressData;

  cy.fillForm({
    '#first-name': user.firstName,
    '#last-name': user.lastName,
    '#street': address.street,
    '#city': address.city,
    '#zip': address.zipCode,
  });
});
```
