# 🎯 **Simple Guide to Cypress Utils Framework**

**Framework Author: Karmit Lalani**

## **What is this?**

This is a **beginner-friendly** Cypress testing framework that makes your tests easier to write and understand. Instead of writing complex Cypress commands, you can use simple, descriptive functions. The framework combines related utilities into organized, logical files.

## **Why use this?**

- ✅ **Easier to understand** - Function names are clear and descriptive
- ✅ **Less typing** - Shorter commands that do more
- ✅ **Better tests** - More readable and maintainable test code
- ✅ **TypeScript support** - Get help from your editor

## **What can you do with it?**

### 🖱️ **Easy UI Testing**
```typescript
// Instead of complex Cypress commands, use simple ones:
cy.dragTo('#source', '#target');           // Drag and drop
cy.scrollTo('.content');                   // Scroll to element
cy.clickAll(['.step1', '.step2', '.step3']); // Click multiple elements
cy.uploadFile('#file-input', 'file.txt');  // Upload a file
cy.waitForReady('.button');                // Wait for element to be ready
```

### 🔌 **Easy API Testing**
```typescript
// Simple API testing:
cy.getData('/api/users');                  // GET request
cy.postData('/api/users', userData);       // POST request
cy.mockRequest('GET', '/api/products', response); // Mock API
cy.hasSucceeded(response);                 // Check if request worked
cy.hasStatus(response, 200);               // Check status code
```

### 📊 **Easy Test Data**
```typescript
// Generate test data easily:
const user = cy.createUserData();          // Random user data
const email = cy.createRandomEmail();      // Random email
const phone = cy.createRandomPhone();      // Random phone
const address = cy.createAddressData();    // Random address
```

### 🖱️ **Easy Mouse Actions**
```typescript
// Simple mouse interactions:
cy.hoverOver('.menu');                     // Hover over element
cy.rightClick('.button');                  // Right click
cy.doubleClick('.text');                   // Double click
cy.typeSlowly('#input', 'text');          // Type slowly
cy.clearAndType('#input', 'new text');    // Clear and type
```

## **How to get started?**

### 1. **Install the package**
```bash
npm install cypress-utils-framework
```

### 2. **Add to your Cypress support file**
```typescript
// In cypress/support/e2e.ts
import { extendCypressCommands } from 'cypress-utils-framework';

// This adds all the easy commands to Cypress
extendCypressCommands();
```

### 3. **Write simple tests**
```typescript
describe('My Simple Test', () => {
  it('should do something easily', () => {
    // Visit page and wait for it to be ready
    cy.visit('https://example.com');
    cy.waitForPageReady();
    
    // Check if element is visible
    cy.isVisible('h1');
    
    // Fill out a form
    cy.fillFormData({
      '#username': 'testuser',
      '#password': 'testpass'
    });
    
    // Click and wait for result
    cy.clickAndWaitFor('#submit', '#success');
  });
});
```

## **What's the difference from regular Cypress?**

| Regular Cypress | This Framework |
|----------------|----------------|
| `cy.get('.button').should('be.visible').click()` | `cy.clickAndWaitFor('.button', '.result')` |
| `cy.request('GET', '/api/users')` | `cy.getData('/api/users')` |
| `cy.get('#input').clear().type('text')` | `cy.clearAndType('#input', 'text')` |
| `cy.get('.item').trigger('mousedown').get('.target').trigger('mouseup')` | `cy.dragTo('.item', '.target')` |

## **Is this for beginners?**

**Yes!** This framework is designed to be:
- 🎯 **Simple** - Easy to understand function names
- 📚 **Well-documented** - Clear examples and explanations
- 🚀 **Powerful** - Does complex things with simple commands
- 🔧 **Maintainable** - Your tests will be easier to update

## **Need help?**

- 📖 Check the main README.md for full documentation
- 🧪 Look at the example tests in `example-usage/`
- 🔍 Each function has clear comments explaining what it does

## **Ready to start?**

Just install the package and start writing simpler, more readable tests! 🎉 