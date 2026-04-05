# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- `waitForNetworkIdle` and `waitForAllRequests` now use `cy.intercept` to track real in-flight requests instead of `cy.wait(N)` hardcoded sleeps
- `requestAndWait` no longer calls `cy.wait(500)` — `cy.request` already resolves on response
- Duplicate request function bodies (`getData`, `postData`, `updateData`, `deleteData`, `makeRequest`, `waitForRequestToFinish`, `mockRequest`) are now re-export aliases for their primary counterparts, eliminating identical implementations
- All HTTP request helpers (`getRequest`, `postRequest`, `putRequest`, `deleteRequest`, `patchRequest`) are now generic: `getRequest<T>(url)` returns `Chainable<Cypress.Response<T>>`
- Replaced all `Chainable<any>` return types with concrete types (`Chainable<JQuery<HTMLElement>>`, `Chainable<null>`, `Chainable<AUTWindow>`, etc.)
- `RequestOptions` is now an alias for `Partial<Cypress.RequestOptions>` to avoid type conflicts
- `@typescript-eslint/no-explicit-any` raised from `warn` to `error`

### Added
- Vitest unit test suite with 73 tests covering test data generators, request helpers, storage helpers, and element helpers
- `vitest.config.ts` with coverage configuration
- `.github/workflows/ci.yml` — runs type-check, lint, tests, and build on every push/PR (Node 18 + 20 matrix)
- `.github/workflows/release.yml` — publishes to npm and creates a GitHub Release on `v*.*.*` tags

### Removed
- `isNetworkIdle` — removed because `cy.wrap(boolean)` results cannot be used for conditional logic in Cypress tests; it always returned `true`
- `test-suite/comprehensive-test.js` — replaced by real Vitest unit tests
- `.github/workflows/ci-cd.yml` — replaced by the two separate workflow files above

### Fixed
- `example-usage/cypress/e2e/login.cy.ts` — replaced `cy.generateUserData()` (unregistered command) with `createUserData()` direct import; replaced `cy.login()`/`cy.logout()` (unregistered) with actual registered commands
- `example-usage/cypress/e2e/api.cy.ts` — same `cy.generateUserData()` fix

---

## [1.6.0] — 2024-03-15

### Added
- **Keyboard operations**: `focusElement`, `blurElement`, `pressKey`, `pressKeySequence`
- **Text selection**: `selectAllText`, `selectTextRange`
- **Clipboard operations**: `copyToClipboard`, `pasteFromClipboard`, `undoAction`, `redoAction`
- **Element state validation**: `isEnabled`, `isDisabled`, `isRequired`, `hasAttribute`, `hasClass`, `hasCSSProperty`
- **Smart waiting**: `waitForText`, `waitForNoText`, `waitForElementCount`, `waitForEmpty`, `waitForNotEmpty`
- **Toggle**: `toggleElement`
- **Session storage utilities**: `setSessionStorage`, `getSessionStorage`, `removeSessionStorage`, `clearSessionStorage`, `hasSessionStorageKey`
- Additional test data helpers: `createRandomNumbers`, `createRandomColor`, `createRandomBoolean`

---

## [1.5.0] — 2024-01-20

### Added
- Initial public release
- HTTP request utilities: `getRequest`, `postRequest`, `putRequest`, `deleteRequest`, `patchRequest`
- Element interaction utilities: `waitForElement`, `waitForElementExist`, `assertText`, `assertElementVisible`, `assertElementNotVisible`, `clickAndWait`, `fillForm`, `scrollToElement`, `takeScreenshot`
- Enhanced UI: `dragTo`, `clickAll`, `uploadFile`, `waitForReady`, `fillFormData`, `waitForLoading`, `containsText`, `isVisible`, `isHidden`, `isChecked`, `isUnchecked`, `selectOption`, `typeSlowly`, `clearAndType`, `hoverOver`, `rightClick`, `doubleClick`, `clickAndWaitFor`, `waitForPageReady`
- Test data generators: `createUserData`, `createAddressData`, `createProductData`, `createOrderData`, `createRandomEmail`, `createRandomString`, `createRandomPhone`, `createRandomDate`, `createTestData`, `createDataWithValues`, `createDataWithOverrides`
- Network utilities: `waitForNetworkIdle`, `waitForNetworkIdleWithOptions`, `waitForNetworkRequest`, `interceptNetworkRequest`, `interceptMultipleRequests`
- Navigation utilities: `visit`, `visitAndWait`, `visitAndWaitForIdle`, `reload`, `goBack`, `goForward`
- Local storage utilities: `setLocalStorage`, `getLocalStorage`, `removeLocalStorage`, `hasLocalStorageKey`, `getLocalStorageKeys`, `getLocalStorageSize`, `setMultipleLocalStorage`, `getAllLocalStorage`
- Response assertion helpers: `hasStatus`, `hasSucceeded`, `hasFailed`, `isArray`, `isObject`, `containsData`, `getResponseData`
- Request variants: `requestWithHeaders`, `requestWithToken`, `requestAndWait`
- TypeScript support with full `.d.ts` declarations
- CJS and ESM builds via tsup
- `extendCypressCommands()` for registering all utilities as `cy.*` custom commands
