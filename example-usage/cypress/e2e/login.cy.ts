import { createUserData } from 'cypress-utils-framework/utils';
import type { UserData } from 'cypress-utils-framework';

describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visitAndWait('/login', '.login-form');
  });

  it('should display login form', () => {
    cy.assertElementVisible('#username');
    cy.assertElementVisible('#password');
    cy.assertElementVisible('#login-button');

    cy.assertText('h1', 'Login');
    cy.assertText('label[for="username"]', 'Username');
    cy.assertText('label[for="password"]', 'Password');
  });

  it('should fill and submit login form', () => {
    const userData = createUserData() as UserData;

    cy.fillForm({
      '#username': userData.username,
      '#password': userData.password,
    });

    cy.clickAndWait('#login-button', '.dashboard');

    cy.url().should('include', '/dashboard');
    cy.assertText('.welcome-message', `Welcome, ${userData.firstName}!`);
  });

  it('should handle invalid credentials', () => {
    cy.fillForm({
      '#username': 'invalid_user',
      '#password': 'wrong_password',
    });

    cy.get('#login-button').click();

    cy.assertText('.error-message', 'Invalid credentials');
    cy.assertElementNotVisible('.dashboard');
  });

  it('should navigate back to login after logout', () => {
    const { username, password } = createUserData() as UserData;

    // Log in using available commands
    cy.visitAndWait('/login', '.login-form');
    cy.fillForm({ '#username': username, '#password': password });
    cy.clickAndWait('#login-button', '.dashboard');

    cy.url().should('include', '/dashboard');

    // Log out
    cy.get('.logout-button').click();
    cy.waitForElement('.login-form');

    cy.url().should('include', '/login');
  });
});
