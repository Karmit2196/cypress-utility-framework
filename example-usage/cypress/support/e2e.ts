// Import and extend Cypress commands with our utility framework
import { extendCypressCommands } from 'cypress-utils-framework';

// Extend Cypress with custom commands
extendCypressCommands();

// Additional custom commands can be added here
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login');
  cy.fillForm({
    '#username': username,
    '#password': password
  });
  cy.clickAndWait('#login-button', '.dashboard');
});

Cypress.Commands.add('logout', () => {
  cy.get('#logout-button').click();
  cy.url().should('include', '/login');
});

// Declare custom command types
declare global {
  namespace Cypress {
    interface Chainable {
      login: (username: string, password: string) => Chainable<any>;
      logout: () => Chainable<any>;
    }
  }
} 