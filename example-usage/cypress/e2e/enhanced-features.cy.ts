describe('Enhanced Cypress Utils - Simple Examples', () => {
  beforeEach(() => {
    // Visit a test page
    cy.visit('https://example.com');
  });

  it('should demonstrate enhanced UI interactions', () => {
    // Wait for page to be ready
    cy.waitForPageReady();
    
    // Check if main heading is visible
    cy.isVisible('h1');
    
    // Check if heading contains expected text
    cy.containsText('h1', 'Example Domain');
    
    // Take a screenshot
    cy.takeScreenshot('example-page');
    
    // Scroll to a specific element
    cy.scrollTo('p');
    
    // Check if paragraph is visible after scrolling
    cy.isVisible('p');
  });

  it('should demonstrate enhanced form interactions', () => {
    // Create test data
    const userData = cy.createUserData();
    
    // Fill out a form (if there was one)
    // cy.fillFormData({
    //   '#username': userData.username,
    //   '#email': userData.email,
    //   '#password': userData.password
    // });
    
    // Type text slowly (useful for slow typing)
    // cy.typeSlowly('#search', 'test search');
    
    // Clear and type new text
    // cy.clearAndType('#search', 'new search text');
  });

  it('should demonstrate enhanced file operations', () => {
    // Upload a file (if there was a file input)
    // cy.uploadFile('#file-input', 'cypress/fixtures/test-file.txt');
    
    // Wait for loading to complete
    cy.waitForLoading();
  });

  it('should demonstrate enhanced element checks', () => {
    // Check if element is visible
    cy.isVisible('h1');
    
    // Check if element is hidden (doesn't exist on this page)
    // cy.isHidden('.hidden-element');
    
    // Check if checkbox is checked (if there was one)
    // cy.isChecked('#agree-terms');
    
    // Check if checkbox is unchecked
    // cy.isUnchecked('#newsletter');
  });

  it('should demonstrate enhanced mouse interactions', () => {
    // Hover over an element
    cy.hoverOver('h1');
    
    // Right click on an element
    cy.rightClick('h1');
    
    // Double click on an element
    cy.doubleClick('h1');
  });

  it('should demonstrate enhanced API testing', () => {
    // Mock a request
    cy.mockRequest('GET', '/api/products', {
      statusCode: 200,
      body: [{ id: 1, name: 'Test Product' }]
    });
    
    // Make a GET request
    cy.getData('/api/users').then((response) => {
      // Check if request succeeded
      cy.hasSucceeded(response);
      
      // Check if response has correct status
      cy.hasStatus(response, 200);
      
      // Check if response is an array
      cy.isArray(response);
      
      // Get data from response
      const users = cy.getResponseData(response);
      expect(users).to.have.length(1);
    });
  });

  it('should demonstrate enhanced test data generation', () => {
    // Create random test data
    const email = cy.createRandomEmail();
    const phone = cy.createRandomPhone();
    const randomString = cy.createRandomString(10);
    
    // Create user data
    const user = cy.createUserData();
    expect(user).to.have.property('email');
    expect(user).to.have.property('firstName');
    
    // Create address data
    const address = cy.createAddressData();
    expect(address).to.have.property('street');
    expect(address).to.have.property('city');
    
    // Create product data
    const product = cy.createProductData();
    expect(product).to.have.property('name');
    expect(product).to.have.property('price');
    
    // Create order data
    const order = cy.createOrderData();
    expect(order).to.have.property('orderNumber');
    expect(order).to.have.property('total');
    
    // Create random numbers
    const numbers = cy.createRandomNumbers(5, 1, 100);
    expect(numbers).to.have.length(5);
    
    // Create random color
    const color = cy.createRandomColor();
    expect(color).to.be.a('string');
    
    // Create random boolean
    const bool = cy.createRandomBoolean();
    expect(bool).to.be.a('boolean');
  });

  it('should demonstrate enhanced form validation', () => {
    // Create test data with specific values
    const testData = cy.createDataWithValues({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    
    // Create test data with overrides
    const baseTemplate = {
      username: 'defaultuser',
      email: 'default@example.com'
    };
    
    const overriddenData = cy.createDataWithOverrides(baseTemplate, {
      username: 'customuser'
    });
    
    expect(overriddenData.username).to.equal('customuser');
    expect(overriddenData.email).to.equal('default@example.com');
  });

  it('should demonstrate enhanced waiting patterns', () => {
    // Click something and wait for result
    // cy.clickAndWaitFor('#button', '#result');
    
    // Wait for element to be ready
    cy.waitForReady('h1');
    
    // Wait for loading to complete
    cy.waitForLoading();
  });

  it('should demonstrate enhanced multiple element operations', () => {
    // Click multiple elements in order
    // cy.clickAll(['#first', '#second', '#third']);
    
    // Drag and drop (if there were draggable elements)
    // cy.dragTo('#source', '#target');
  });
}); 