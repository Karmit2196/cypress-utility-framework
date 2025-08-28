describe('API Tests', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  
  it('should get users from API', () => {
    // Use our enhanced GET request utility
    cy.getRequest(`${baseUrl}/users`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length(10);
      
      // Verify first user structure
      const firstUser = response.body[0];
      expect(firstUser).to.have.property('id');
      expect(firstUser).to.have.property('name');
      expect(firstUser).to.have.property('email');
    });
  });

  it('should create a new user', () => {
    // Generate test user data
    const userData = cy.generateUserData();
    
    // Use our enhanced POST request utility
    cy.postRequest(`${baseUrl}/users`, userData).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eq(userData.firstName);
      expect(response.body.email).to.eq(userData.email);
    });
  });

  it('should update an existing user', () => {
    const userId = 1;
    const updateData = {
      name: 'Updated User Name',
      email: 'updated@example.com'
    };
    
    // Use our enhanced PUT request utility
    cy.putRequest(`${baseUrl}/users/${userId}`, updateData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(updateData.name);
      expect(response.body.email).to.eq(updateData.email);
    });
  });

  it('should delete a user', () => {
    const userId = 1;
    
    // Use our enhanced DELETE request utility
    cy.deleteRequest(`${baseUrl}/users/${userId}`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should handle API errors gracefully', () => {
    // Test with invalid endpoint
    cy.getRequest(`${baseUrl}/invalid-endpoint`).then((response) => {
      expect(response.status).to.be.greaterThan(399);
    });
  });
}); 