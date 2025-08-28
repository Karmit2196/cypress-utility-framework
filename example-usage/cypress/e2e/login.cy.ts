describe('Login Page Tests', () => {
  beforeEach(() => {
    // Visit the login page and wait for it to load
    cy.visitAndWait('/login', '.login-form');
  });

  it('should display login form', () => {
    // Assert elements are visible
    cy.assertElementVisible('#username');
    cy.assertElementVisible('#password');
    cy.assertElementVisible('#login-button');
    
    // Assert form text
    cy.assertText('h1', 'Login');
    cy.assertText('label[for="username"]', 'Username');
    cy.assertText('label[for="password"]', 'Password');
  });

  it('should fill and submit login form', () => {
    // Generate test user data
    const userData = cy.generateUserData();
    
    // Fill the form
    cy.fillForm({
      '#username': userData.username,
      '#password': userData.password
    });
    
    // Submit and wait for redirect
    cy.clickAndWait('#login-button', '.dashboard');
    
    // Assert successful login
    cy.url().should('include', '/dashboard');
    cy.assertText('.welcome-message', `Welcome, ${userData.firstName}!`);
  });

  it('should handle invalid credentials', () => {
    // Fill with invalid data
    cy.fillForm({
      '#username': 'invalid_user',
      '#password': 'wrong_password'
    });
    
    // Submit form
    cy.get('#login-button').click();
    
    // Assert error message
    cy.assertText('.error-message', 'Invalid credentials');
    cy.assertElementNotVisible('.dashboard');
  });

  it('should navigate back to login after logout', () => {
    // Login first
    cy.login('testuser', 'testpass123');
    
    // Verify we're on dashboard
    cy.url().should('include', '/dashboard');
    
    // Logout
    cy.logout();
    
    // Verify we're back on login page
    cy.url().should('include', '/login');
    cy.assertElementVisible('.login-form');
  });
}); 