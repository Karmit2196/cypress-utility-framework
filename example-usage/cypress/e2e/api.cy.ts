import { createUserData } from 'cypress-utils-framework/utils';
import type { UserData } from 'cypress-utils-framework';

describe('API Tests', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  it('should get users from API', () => {
    cy.getRequest(`${baseUrl}/users`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length(10);

      const firstUser = response.body[0];
      expect(firstUser).to.have.property('id');
      expect(firstUser).to.have.property('name');
      expect(firstUser).to.have.property('email');
    });
  });

  it('should create a new user', () => {
    const userData = createUserData() as UserData;

    cy.postRequest(`${baseUrl}/users`, userData).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
    });
  });

  it('should update an existing user', () => {
    const userId = 1;
    const update = { name: 'Updated User Name', email: 'updated@example.com' };

    cy.putRequest(`${baseUrl}/users/${userId}`, update).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(update.name);
      expect(response.body.email).to.eq(update.email);
    });
  });

  it('should delete a user', () => {
    cy.deleteRequest(`${baseUrl}/users/1`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should handle API errors gracefully', () => {
    cy.getRequest(`${baseUrl}/invalid-endpoint`).then((response) => {
      expect(response.status).to.be.greaterThan(399);
    });
  });
});
