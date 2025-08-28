# Cypress Utils Framework - Usage Guide

This guide provides comprehensive examples and best practices for using the Cypress Utils Framework in your test automation projects.

**Framework Author: Karmit Lalani**

## Table of Contents

1. [Getting Started](#getting-started)
2. [Navigation Utilities](#navigation-utilities)
3. [Request Utilities](#request-utilities)
4. [Element Utilities](#element-utilities)
5. [Test Data Generation](#test-data-generation)
6. [Network Utilities](#network-utilities)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

## Getting Started

### Installation

```bash
npm install cypress-utils-framework
```

### Basic Setup

```typescript
// cypress/support/e2e.ts
import { extendCypressCommands } from 'cypress-utils-framework';

// Extend Cypress with custom commands
extendCypressCommands();
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["cypress", "node"]
  }
}
```

## Navigation Utilities

### Basic Navigation

```typescript
describe('Navigation Tests', () => {
  it('should navigate to different pages', () => {
    // Basic visit
    cy.visit('/');
    
    // Visit and wait for element
    cy.visitAndWait('/dashboard', '.dashboard-container');
    
    // Visit and wait for network idle
    cy.visitAndWaitForIdle('/profile', 15000);
    
    // Navigate back and forward
    cy.goBack();
    cy.goForward();
    
    // Reload page
    cy.reload();
  });
});
```

### Advanced Navigation Patterns

```typescript
describe('Multi-step Navigation', () => {
  it('should complete a multi-step form', () => {
    // Step 1: Login
    cy.visitAndWait('/login', '.login-form');
    cy.fillForm({
      '#username': 'testuser',
      '#password': 'testpass123'
    });
    cy.clickAndWait('#login-button', '.dashboard');
    
    // Step 2: Navigate to profile
    cy.visitAndWait('/profile', '.profile-form');
    
    // Step 3: Update profile
    cy.fillForm({
      '#firstName': 'Updated',
      '#lastName': 'Name'
    });
    cy.clickAndWait('#save-button', '.success-message');
    
    // Verify navigation
    cy.url().should('include', '/profile');
  });
});
```

## Request Utilities

### API Testing

```typescript
describe('API Tests', () => {
  const baseUrl = 'https://api.example.com';
  
  it('should test CRUD operations', () => {
    // GET request
    cy.getRequest(`${baseUrl}/users`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
    
    // POST request
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    
    cy.postRequest(`${baseUrl}/users`, newUser).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(newUser.name);
    });
    
    // PUT request
    const updateData = { name: 'Jane Doe' };
    cy.putRequest(`${baseUrl}/users/1`, updateData).then((response) => {
      expect(response.status).to.eq(200);
    });
    
    // DELETE request
    cy.deleteRequest(`${baseUrl}/users/1`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  
  it('should handle request options', () => {
    const options = {
      headers: {
        'Authorization': 'Bearer token123',
        'Content-Type': 'application/json'
      },
      timeout: 30000,
      failOnStatusCode: false
    };
    
    cy.getRequest(`${baseUrl}/protected`, options).then((response) => {
      // Handle response
    });
  });
});
```

### Request Interception

```typescript
describe('Request Interception', () => {
  it('should mock API responses', () => {
    // Intercept and mock a request
    cy.interceptNetworkRequest('GET', '/api/users', {
      statusCode: 200,
      body: [
        { id: 1, name: 'Mock User 1' },
        { id: 2, name: 'Mock User 2' }
      ]
    });
    
    // Visit page that makes the request
    cy.visit('/users');
    
    // Wait for the intercepted request
    cy.waitForNetworkRequest('GET', '/api/users');
    
    // Verify mocked data is displayed
    cy.assertText('.user-list', 'Mock User 1');
  });
});
```

## Element Utilities

### Element Waiting and Assertions

```typescript
describe('Element Interactions', () => {
  it('should wait for and interact with elements', () => {
    // Wait for element to be visible
    cy.waitForElement('.submit-button', 10000);
    
    // Wait for element to exist (may not be visible)
    cy.waitForElementExist('.hidden-element');
    
    // Assert element visibility
    cy.assertElementVisible('.form-container');
    cy.assertElementNotVisible('.loading-spinner');
    
    // Assert text content
    cy.assertText('.welcome-message', 'Welcome to our app');
    cy.assertText('h1', 'Login Form');
  });
  
  it('should handle dynamic content', () => {
    // Wait for element with custom options
    cy.waitForElementWithOptions('.dynamic-content', {
      timeout: 15000,
      visible: true,
      exist: true
    });
    
    // Scroll to element
    cy.scrollToElement('.footer');
    
    // Take screenshot
    cy.takeScreenshot('form-filled');
  });
});
```

### Form Handling

```typescript
describe('Form Handling', () => {
  it('should fill complex forms', () => {
    // Simple form
    cy.fillForm({
      '#username': 'testuser',
      '#email': 'test@example.com',
      '#password': 'password123'
    });
    
    // Complex form with different input types
    cy.fillForm({
      'input[name="firstName"]': 'John',
      'input[name="lastName"]': 'Doe',
      'select[name="country"]': 'US',
      'input[type="checkbox"]': true,
      'input[type="radio"][value="option1"]': true
    });
    
    // Submit form
    cy.clickAndWait('#submit-button', '.success-message');
  });
  
  it('should handle form validation', () => {
    // Fill invalid data
    cy.fillForm({
      '#email': 'invalid-email',
      '#password': '123' // too short
    });
    
    // Submit and check validation errors
    cy.get('#submit-button').click();
    cy.assertText('.error-message', 'Please enter a valid email');
    cy.assertText('.password-error', 'Password must be at least 8 characters');
  });
});
```

## Test Data Generation

### Basic Data Generation

```typescript
describe('Test Data Generation', () => {
  it('should generate various types of test data', () => {
    // Generate single user
    const user = cy.generateUserData();
    console.log('Generated user:', user);
    
    // Generate multiple users
    const users = cy.generateUserData(5);
    expect(users).to.have.length(5);
    
    // Generate address data
    const address = cy.generateAddressData();
    console.log('Generated address:', address);
  });
  
  it('should use custom templates', () => {
    const customTemplate = {
      productName: () => `Product ${Math.floor(Math.random() * 1000)}`,
      price: () => Math.floor(Math.random() * 1000) + 10,
      category: () => ['Electronics', 'Clothing', 'Books'][Math.floor(Math.random() * 3)],
      inStock: true
    };
    
    const products = cy.generateTestData(customTemplate, 3);
    console.log('Generated products:', products);
  });
});
```

### Advanced Data Patterns

```typescript
describe('Advanced Data Patterns', () => {
  it('should generate realistic test scenarios', () => {
    // Generate test users for different scenarios
    const adminUser = {
      ...cy.generateUserData(),
      role: 'admin',
      permissions: ['read', 'write', 'delete']
    };
    
    const regularUser = {
      ...cy.generateUserData(),
      role: 'user',
      permissions: ['read']
    };
    
    // Use in tests
    cy.login(adminUser.username, adminUser.password);
    cy.visit('/admin-panel');
    cy.assertElementVisible('.admin-controls');
    
    cy.login(regularUser.username, regularUser.password);
    cy.visit('/admin-panel');
    cy.assertElementVisible('.access-denied');
  });
});
```

## Network Utilities

### Network Management

```typescript
describe('Network Management', () => {
  it('should wait for network operations', () => {
    // Wait for network to be idle
    cy.waitForNetworkIdle(10000);
    
    // Wait for specific request
    cy.waitForNetworkRequest('POST', '/api/submit');
    
    // Wait for all requests to complete
    cy.waitForAllRequests(30000);
  });
  
  it('should intercept multiple requests', () => {
    // Intercept multiple endpoints
    cy.interceptMultipleRequests([
      {
        method: 'GET',
        url: '/api/users',
        response: { users: [] }
      },
      {
        method: 'POST',
        url: '/api/users',
        response: { success: true }
      }
    ]);
    
    // Visit page that triggers these requests
    cy.visit('/users');
  });
});
```

## Best Practices

### 1. Command Organization

```typescript
// Organize commands by functionality
Cypress.Commands.add('loginAsAdmin', () => {
  cy.login('admin', 'adminpass');
  cy.visit('/admin');
});

Cypress.Commands.add('loginAsUser', (role = 'user') => {
  const user = cy.generateUserData();
  user.role = role;
  cy.login(user.username, user.password);
  return user;
});
```

### 2. Reusable Test Data

```typescript
// Create reusable test data factories
const createTestUser = (overrides = {}) => ({
  ...cy.generateUserData(),
  ...overrides
});

const createTestProduct = (overrides = {}) => ({
  name: `Product ${Date.now()}`,
  price: Math.floor(Math.random() * 100) + 10,
  category: 'Electronics',
  ...overrides
});
```

### 3. Page Object Pattern

```typescript
class LoginPage {
  elements = {
    username: '#username',
    password: '#password',
    submitButton: '#login-button',
    errorMessage: '.error-message'
  };
  
  visit() {
    cy.visitAndWait('/login', this.elements.username);
  }
  
  login(username: string, password: string) {
    cy.fillForm({
      [this.elements.username]: username,
      [this.elements.password]: password
    });
    cy.clickAndWait(this.elements.submitButton, '.dashboard');
  }
  
  assertError(message: string) {
    cy.assertText(this.elements.errorMessage, message);
  }
}

const loginPage = new LoginPage();
```

### 4. Error Handling

```typescript
// Create robust error handling
Cypress.Commands.add('safeClick', (selector: string, options = {}) => {
  cy.get(selector, { timeout: 10000 })
    .should('be.visible')
    .should('not.be.disabled')
    .click(options);
});

Cypress.Commands.add('safeType', (selector: string, text: string) => {
  cy.get(selector, { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type(text);
});
```

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Ensure you have `@types/cypress` installed
2. **Command Not Found**: Make sure `extendCypressCommands()` is called in your support file
3. **Import Errors**: Check that the package is properly installed and imported

### Debug Mode

```typescript
// Enable debug logging
Cypress.Commands.add('debug', (message: string) => {
  if (Cypress.env('DEBUG')) {
    cy.log(`[DEBUG] ${message}`);
  }
});

// Use in tests
cy.debug('Starting login process');
cy.login('user', 'pass');
cy.debug('Login completed');
```

### Performance Monitoring

```typescript
// Monitor test performance
Cypress.Commands.add('measurePerformance', (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  cy.log(`Performance [${name}]: ${end - start}ms`);
});
```

## Migration Guide

### From Vanilla Cypress

```typescript
// Before (vanilla Cypress)
cy.visit('/page');
cy.get('.element', { timeout: 10000 }).should('be.visible');
cy.get('#input').type('text');
cy.get('#button').click();

// After (with utilities)
cy.visitAndWait('/page', '.element');
cy.safeType('#input', 'text');
cy.safeClick('#button');
```

### From Other Utility Libraries

```typescript
// If migrating from other libraries, you can create aliases
Cypress.Commands.add('waitFor', (selector: string) => {
  cy.waitForElement(selector);
});

Cypress.Commands.add('assertVisible', (selector: string) => {
  cy.assertElementVisible(selector);
});
```

This comprehensive usage guide should help you get the most out of the Cypress Utils Framework. Remember to check the [README.md](README.md) for installation and setup instructions. 