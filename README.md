# Cypress Utils Framework

A beginner-friendly utility framework for Cypress test automation with TypeScript support.

**Created by Karmit Lalani** This package provides easy-to-use wrapper methods around common Cypress commands that make your tests more readable and maintainable.

## Features

- 🚀 **Easy Navigation**: Visit pages with automatic waiting and network idle detection
- 🔌 **Simple HTTP Utilities**: Easy-to-understand request methods (GET, POST, PUT, DELETE)
- 🎯 **Element Interactions**: Simple element waiting, assertions, and form filling
- 📊 **Test Data Generation**: Easy test data generation with templates
- 🌐 **Network Management**: Simple network request interception and waiting
- 📱 **Screenshot & Scrolling**: Easy screenshot and scrolling capabilities
- 🔧 **TypeScript Support**: Full TypeScript support with proper type definitions

### 🆕 **Enhanced Features (v1.5)**

- 🎭 **Enhanced UI Interactions**: Drag & drop, multiple clicks, file uploads, hover effects
- 🔄 **Enhanced Request Handling**: API testing with response validation and helpers
- 📊 **Enhanced Test Data**: Generate random emails, names, addresses, products, and more
- 🖱️ **Mouse Actions**: Right-click, double-click, hover, slow typing, clear and type
- ⏱️ **Smart Waiting**: Wait for elements, loading, page readiness

### 🚀 **Advanced UI Utilities (v1.6.0)**

- ⌨️ **Keyboard Operations**: Focus, blur, key presses, key sequences
- 📋 **Clipboard Operations**: Copy, paste, undo, redo actions
- 🎯 **Text Selection**: Select all text, text range selection
- 🔍 **Element State Validation**: Enabled/disabled, required, attributes, classes, CSS properties
- ⏱️ **Smart Waiting**: Wait for text, element count, empty/not empty states
- 🎨 **Professional Testing**: 25+ new UI utility methods for comprehensive element testing

## Installation

```bash
npm install cypress-utils-framework
```

## Quick Start

### 1. Import and Extend Cypress Commands

```typescript
// In your cypress/support/e2e.ts or cypress/support/commands.ts
import { extendCypressCommands } from 'cypress-utils-framework';

// Extend Cypress with custom commands
extendCypressCommands();
```

### 2. Use Enhanced Commands

```typescript
describe('Example Test', () => {
  it('should navigate and interact with elements', () => {
    // Visit page and wait for element
    cy.visitAndWait('https://example.com', '.app-container');
    
    // Wait for network to be idle
    cy.visitAndWaitForIdle('https://example.com');
    
    // Enhanced element waiting
    cy.waitForElement('.submit-button', 10000);
    
    // Assert text content
    cy.assertText('.welcome-message', 'Welcome to our app');
    
    // Fill form with data
    cy.fillForm({
      '#username': 'testuser',
      '#password': 'testpass123'
    });
    
    // Click and wait for something
    cy.clickAndWait('.submit-button', '.success-message');
  });
});
```

### 3. Use Utility Functions Directly

```typescript
import { 
  visit, 
  getRequest, 
  generateUserData, 
  waitForElement 
} from 'cypress-utils-framework';

describe('API Tests', () => {
  it('should test API endpoints', () => {
    // Generate test data
    const userData = generateUserData();
    
    // Make API requests
    getRequest('/api/users').then((response) => {
      expect(response.status).to.eq(200);
    });
    
    // Use navigation utilities
    visit('https://example.com');
    
    // Wait for elements
    waitForElement('.user-profile');
  });
});
```

## Enhanced Features Showcase

### 🎭 Enhanced UI Interactions

```typescript
// Drag and drop - simple and straightforward
cy.dragTo('.draggable-item', '.drop-zone');

// Scroll to make element visible
cy.scrollTo('.scrollable-container');

// Click multiple elements in order
cy.clickAll(['.step-1', '.step-2', '.step-3']);

// Upload a file
cy.uploadFile('#file-input', 'cypress/fixtures/test-file.txt');

// Wait for element to be ready
cy.waitForReady('.submit-button');
```

### 🚀 **Advanced UI Utilities (v1.6.0)**

```typescript
// Focus and blur operations
cy.focusElement('#username');
cy.blurElement('#username');

// Keyboard operations
cy.pressKey('#search', 'enter');
cy.pressKeySequence('#input', ['ctrl', 'a', 'delete']);

// Text selection
cy.selectAllText('#textarea');
cy.selectTextRange('#input', 0, 5);

// Clipboard operations
cy.copyToClipboard('#source');
cy.pasteFromClipboard('#target');
cy.undoAction('#editor');
cy.redoAction('#editor');

// Element state validation
cy.isEnabled('#submit-button');
cy.isDisabled('#loading-button');
cy.isRequired('#email-field');
cy.hasAttribute('#input', 'data-testid');
cy.hasClass('.button', 'primary');
cy.hasCSSProperty('.element', 'color', 'rgb(255, 0, 0)');

// Smart waiting utilities
cy.waitForText('.status', 'Success');
cy.waitForNoText('.error', 'Failed');
cy.waitForElementCount('.item', 5);
cy.waitForEmpty('.list');
cy.waitForNotEmpty('.results');
```

### 🔄 Enhanced Request Handling

```typescript
// Make simple requests
cy.getData('/api/users').then((response) => {
  // Check if request succeeded
  cy.hasSucceeded(response);
  
  // Check if response has correct status
  cy.hasStatus(response, 200);
  
  // Check if response is an array
  cy.isArray(response);
});

// Post data easily
cy.postData('/api/users', { name: 'John', email: 'john@example.com' });

// Mock a request
cy.mockRequest('GET', '/api/products', {
  statusCode: 200,
  body: [{ id: 1, name: 'Product 1' }]
});
```

### 📊 Enhanced Test Data Generation

```typescript
// Create random user data
const user = cy.createUserData();
expect(user).to.have.property('email');
expect(user).to.have.property('firstName');

// Create random email
const email = cy.createRandomEmail();

// Create random phone
const phone = cy.createRandomPhone();

// Create address data
const address = cy.createAddressData();

// Create product data
const product = cy.createProductData();
```

### 🖱️ Enhanced Mouse Actions

```typescript
// Hover over element
cy.hoverOver('.menu-item');

// Right click
cy.rightClick('.context-menu-trigger');

// Double click
cy.doubleClick('.editable-text');

// Type text slowly
cy.typeSlowly('#search', 'test search');

// Clear and type new text
cy.clearAndType('#input', 'new value');
```

### ♿ Accessibility Testing

```typescript
// Comprehensive accessibility audit
cy.runAccessibilityAudit({
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa']
  }
}).then((violations) => {
  const criticalViolations = violations.filter(v => v.impact === 'critical');
  expect(criticalViolations).to.have.length(0);
});

// Test keyboard navigation
cy.testKeyboardNavigation({
  includeTabIndex: true,
  testArrowKeys: true
});

// Test color contrast
cy.testColorContrast(['h1', 'p', 'button'], {
  threshold: 'AA'
});

// Test responsive accessibility
cy.testResponsiveAccessibility([
  { width: 320, height: 568 },   // Mobile
  { width: 768, height: 1024 },  // Tablet
  { width: 1920, height: 1080 }  // Desktop
]);
```

### 🚦 Circuit Breaker Pattern

```typescript
// Resilient API testing
cy.circuitBreakerRequest('GET', '/api/unreliable', null, {
  circuitBreaker: {
    failureThreshold: 3,
    recoveryTimeout: 10000,
    monitorInterval: 5000
  }
});
```

## API Reference

### Navigation Utilities

| Method | Description | Parameters |
|--------|-------------|------------|
| `visit(url, options?)` | Enhanced visit with options | `url: string`, `options?: any` |
| `visitAndWait(url, waitForSelector?)` | Visit and wait for element | `url: string`, `waitForSelector?: string` |
| `visitAndWaitForIdle(url, timeout?)` | Visit and wait for network idle | `url: string`, `timeout?: number` |
| `reload()` | Reload current page | - |
| `goBack()` | Go to previous page | - |
| `goForward()` | Go to next page | - |

### Request Utilities

| Method | Description | Parameters |
|--------|-------------|------------|
| `getRequest(url, options?)` | GET request | `url: string`, `options?: RequestOptions` |
| `postRequest(url, body?, options?)` | POST request | `url: string`, `body?: any`, `options?: RequestOptions` |
| `putRequest(url, body?, options?)` | PUT request | `url: string`, `body?: any`, `options?: RequestOptions` |
| `deleteRequest(url, options?)` | DELETE request | `url: string`, `options?: RequestOptions` |
| `patchRequest(url, body?, options?)` | PATCH request | `url: string`, `body?: any`, `options?: RequestOptions` |

### Element Utilities

| Method | Description | Parameters |
|--------|-------------|------------|
| `waitForElement(selector, timeout?)` | Wait for element to be visible | `selector: string`, `timeout?: number` |
| `waitForElementExist(selector, timeout?)` | Wait for element to exist | `selector: string`, `timeout?: number` |
| `assertText(selector, expectedText)` | Assert element text content | `selector: string`, `expectedText: string` |
| `assertElementVisible(selector)` | Assert element is visible | `selector: string` |
| `assertElementNotVisible(selector)` | Assert element is not visible | `selector: string` |
| `clickAndWait(selector, waitFor?)` | Click and wait for element | `selector: string`, `waitFor?: string` |
| `fillForm(formData)` | Fill form with data | `formData: Record<string, string>` |
| `scrollToElement(selector)` | Scroll to element | `selector: string` |
| `takeScreenshot(name?)` | Take screenshot | `name?: string` |

### Enhanced UI Interactions

| Method | Description | Parameters |
|--------|-------------|------------|
| `dragTo(fromSelector, toSelector)` | Drag and drop element | `fromSelector: string`, `toSelector: string` |
| `scrollTo(selector)` | Scroll to element | `selector: string` |
| `clickAll(selectors)` | Click multiple elements | `selectors: string[]` |
| `uploadFile(selector, filePath)` | Upload file to input | `selector: string`, `filePath: string` |
| `focusElement(selector)` | Focus on element | `selector: string` |
| `blurElement(selector)` | Remove focus from element | `selector: string` |
| `pressKey(selector, key)` | Press specific key | `selector: string`, `key: string` |
| `pressKeySequence(selector, keys)` | Press sequence of keys | `selector: string`, `keys: string[]` |
| `selectAllText(selector)` | Select all text in element | `selector: string` |
| `selectTextRange(selector, start, end)` | Select text range | `selector: string`, `start: number`, `end: number` |
| `copyToClipboard(selector)` | Copy text to clipboard | `selector: string` |
| `pasteFromClipboard(selector)` | Paste from clipboard | `selector: string` |
| `undoAction(selector)` | Undo last action | `selector: string` |
| `redoAction(selector)` | Redo last action | `selector: string` |
| `toggleElement(selector)` | Toggle element state | `selector: string` |
| `hoverOver(selector)` | Hover over element | `selector: string` |
| `rightClick(selector)` | Right click on element | `selector: string` |
| `doubleClick(selector)` | Double click on element | `selector: string` |
| `typeSlowly(selector, text, delay?)` | Type text with delay | `selector: string`, `text: string`, `delay?: number` |
| `clearAndType(selector, text)` | Clear and type text | `selector: string`, `text: string` |

### Element State Validation

| Method | Description | Parameters |
|--------|-------------|------------|
| `isVisible(selector)` | Check if element is visible | `selector: string` |
| `isHidden(selector)` | Check if element is hidden | `selector: string` |
| `isEnabled(selector)` | Check if element is enabled | `selector: string` |
| `isDisabled(selector)` | Check if element is disabled | `selector: string` |
| `isChecked(selector)` | Check if checkbox is checked | `selector: string` |
| `isUnchecked(selector)` | Check if checkbox is unchecked | `selector: string` |
| `isRequired(selector)` | Check if element is required | `selector: string` |
| `hasAttribute(selector, attribute, value?)` | Check element attribute | `selector: string`, `attribute: string`, `value?: string` |
| `hasClass(selector, className)` | Check if element has class | `selector: string`, `className: string` |
| `hasCSSProperty(selector, property, value)` | Check CSS property | `selector: string`, `property: string`, `value: string` |

### Smart Waiting Utilities

| Method | Description | Parameters |
|--------|-------------|------------|
| `waitForText(selector, text, timeout?)` | Wait for specific text | `selector: string`, `text: string`, `timeout?: number` |
| `waitForNoText(selector, text, timeout?)` | Wait for text to disappear | `selector: string`, `text: string`, `timeout?: number` |
| `waitForElementCount(selector, count, timeout?)` | Wait for element count | `selector: string`, `count: number`, `timeout?: number` |
| `waitForEmpty(selector, timeout?)` | Wait for element to be empty | `selector: string`, `timeout?: number` |
| `waitForNotEmpty(selector, timeout?)` | Wait for element to not be empty | `selector: string`, `timeout?: number` |
| `waitForReady(selector, timeout?)` | Wait for element to be ready | `selector: string`, `timeout?: number` |
| `waitForLoading(selector, timeout?)` | Wait for loading to complete | `selector: string`, `timeout?: number` |
| `waitForPageReady(timeout?)` | Wait for page to be ready | `timeout?: number` |

### Test Data Utilities

| Method | Description | Parameters |
|--------|-------------|------------|
| `generateTestData(template, count?)` | Generate data from template | `template: TestDataTemplate`, `count?: number` |
| `generateUserData(count?)` | Generate user test data | `count?: number` |
| `generateAddressData(count?)` | Generate address test data | `count?: number` |
| `generateRandomEmail()` | Generate random email | - |
| `generateRandomString(length?)` | Generate random string | `length?: number` |
| `generateRandomPhone()` | Generate random phone | - |

### Network Utilities

| Method | Description | Parameters |
|--------|-------------|------------|
| `waitForNetworkIdle(timeout?)` | Wait for network to be idle | `timeout?: number` |
| `waitForNetworkRequest(method, url, timeout?)` | Wait for specific request | `method: string`, `url: string`, `timeout?: number` |
| `interceptNetworkRequest(method, url, response)` | Intercept request | `method: string`, `url: string`, `response: any` |

## Advanced Usage

### Custom Test Data Templates

```typescript
import { generateTestData } from 'cypress-utils-framework';

const userTemplate = {
  firstName: () => `User${Math.floor(Math.random() * 1000)}`,
  lastName: () => `Test${Math.floor(Math.random() * 1000)}`,
  email: () => `user.${Date.now()}@example.com`,
  age: () => Math.floor(Math.random() * 50) + 18,
  isActive: true
};

const users = generateTestData(userTemplate, 5);
console.log(users);
// Output: Array of 5 users with random data
```

### Form Filling with Complex Selectors

```typescript
cy.fillForm({
  'input[name="username"]': 'testuser',
  '#email': 'test@example.com',
  'select[name="country"]': 'US',
  'input[type="checkbox"]': true
});
```

### Network Request Interception

```typescript
// Intercept and mock API responses
cy.interceptNetworkRequest('GET', '/api/users', {
  statusCode: 200,
  body: [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]
});

// Wait for the request to complete
cy.waitForNetworkRequest('GET', '/api/users');
```

## Configuration

### Global Configuration

```typescript
import { CypressUtilsConfig } from 'cypress-utils-framework';

const config: CypressUtilsConfig = {
  defaultTimeout: 15000,
  defaultRetryInterval: 1000,
  screenshotOnFailure: true,
  logLevel: 'info'
};
```

### Cypress Configuration

```typescript
// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: 'cypress/support/e2e.ts',
  },
});
```

## Development

```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Build the package
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 🐛 Issues: [GitHub Issues](https://github.com/Karmit2196/cypress-utils-framework/issues)
- 📖 Documentation: [GitHub Wiki](https://github.com/Karmit2196/cypress-utils-framework/wiki)

## Changelog

### v1.6.0 - Advanced UI Utilities Release 🎯
- **Advanced Element Interactions**: Focus, blur, keyboard shortcuts, text selection
- **Enhanced State Validation**: Element enabled/disabled, required, attributes, classes, CSS properties
- **Smart Waiting Utilities**: Wait for text, element count, empty/not empty states
- **Clipboard Operations**: Copy, paste, undo, redo actions
- **Keyboard Shortcuts**: Press keys, key sequences, text range selection
- **Professional Testing**: 25+ new UI utility methods for comprehensive element testing

### v1.5.0 - Enhanced Features Release 🚀
- **Enhanced UI Interactions**: Drag & drop, multiple clicks, file uploads, hover effects
- **Enhanced Request Handling**: API testing with response validation and helpers
- **Enhanced Test Data**: Generate random emails, names, addresses, products, and more
- **Mouse Actions**: Right-click, double-click, hover, slow typing, clear and type
- **Smart Waiting**: Wait for elements, loading, page readiness
- **Combined Utilities**: Merged related functions into organized, logical files

### v1.0.0
- Initial release
- Core utility functions
- Cypress command extensions
- TypeScript support
- Comprehensive test coverage

---

**Framework Author: Karmit Lalani**

*Senior Automation Engineer (SDET) & Library Author* 