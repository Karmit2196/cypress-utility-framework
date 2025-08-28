import { Chainable } from 'cypress';
import { RequestOptions } from '../types';

// ===== BASIC REQUEST UTILITIES =====

/**
 * GET request wrapper
 */
export const getRequest = (url: string, options?: RequestOptions): Chainable<any> => {
  return cy.request('GET', url, options);
};

/**
 * POST request wrapper
 */
export const postRequest = (url: string, body?: any, options?: RequestOptions): Chainable<any> => {
  return cy.request('POST', url, body, options);
};

/**
 * PUT request wrapper
 */
export const putRequest = (url: string, body?: any, options?: RequestOptions): Chainable<any> => {
  return cy.request('PUT', url, body, options);
};

/**
 * DELETE request wrapper
 */
export const deleteRequest = (url: string, options?: RequestOptions): Chainable<any> => {
  return cy.request('DELETE', url, options);
};

/**
 * PATCH request wrapper
 */
export const patchRequest = (url: string, body?: any, options?: RequestOptions): Chainable<any> => {
  return cy.request('PATCH', url, body, options);
};

/**
 * Request with custom method
 */
export const request = (method: string, url: string, body?: any, options?: RequestOptions): Chainable<any> => {
  return cy.request(method, url, body, options);
};

/**
 * Wait for a specific request to complete
 */
export const waitForRequest = (method: string, url: string, timeout = 10000): Chainable<any> => {
  return cy.wait(`@${method}:${url}`, { timeout });
};

/**
 * Intercept and mock a request
 */
export const interceptRequest = (method: string, url: string, response: any): Chainable<any> => {
  return cy.intercept(method, url, response);
};

// ===== ENHANCED REQUEST UTILITIES =====

/**
 * Make a GET request
 */
export const getData = (url: string, options?: any): Chainable<any> => {
  return cy.request('GET', url, options);
};

/**
 * Make a POST request with data
 */
export const postData = (url: string, data: any, options?: any): Chainable<any> => {
  return cy.request('POST', url, data, options);
};

/**
 * Make a PUT request to update data
 */
export const updateData = (url: string, data: any, options?: any): Chainable<any> => {
  return cy.request('PUT', url, data, options);
};

/**
 * Make a DELETE request
 */
export const deleteData = (url: string, options?: any): Chainable<any> => {
  return cy.request('DELETE', url, options);
};

/**
 * Make a request with custom method
 */
export const makeRequest = (method: string, url: string, data?: any, options?: any): Chainable<any> => {
  return cy.request(method, url, data, options);
};

/**
 * Wait for a specific request to finish
 */
export const waitForRequestToFinish = (method: string, url: string, timeout = 10000): Chainable<any> => {
  return cy.wait(`@${method}:${url}`, { timeout });
};

/**
 * Mock a request response
 */
export const mockRequest = (method: string, url: string, response: any): Chainable<any> => {
  return cy.intercept(method, url, response);
};

/**
 * Check if response has correct status
 */
export const hasStatus = (response: any, status: number): Chainable<any> => {
  expect(response.status).to.eq(status);
  return cy.wrap(response);
};

/**
 * Check if response contains specific data
 */
export const containsData = (response: any, key: string, value: any): Chainable<any> => {
  expect(response.body[key]).to.eq(value);
  return cy.wrap(response);
};

/**
 * Check if response is an array
 */
export const isArray = (response: any): Chainable<any> => {
  expect(response.body).to.be.an('array');
  return cy.wrap(response);
};

/**
 * Check if response is an object
 */
export const isObject = (response: any): Chainable<any> => {
  expect(response.body).to.be.an('object');
  return cy.wrap(response);
};

/**
 * Get data from response body
 */
export const getResponseData = (response: any, key?: string): Chainable<any> => {
  if (key) {
    return cy.wrap(response.body[key]);
  }
  return cy.wrap(response.body);
};

/**
 * Make request with headers
 */
export const requestWithHeaders = (
  method: string,
  url: string,
  data?: any,
  headers?: Record<string, string>
): Chainable<any> => {
  const options = headers ? { headers } : {};
  return cy.request(method, url, data, options);
};

/**
 * Make request with authorization token
 */
export const requestWithToken = (
  method: string,
  url: string,
  token: string,
  data?: any
): Chainable<any> => {
  const options = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return cy.request(method, url, data, options);
};

/**
 * Make request and wait for it to complete
 */
export const requestAndWait = (
  method: string,
  url: string,
  data?: any,
  options?: any
): Chainable<any> => {
  return cy.request(method, url, data, options).then((response) => {
    // Wait a bit to ensure request is fully processed
    cy.wait(500);
    return response;
  });
};

/**
 * Check if request failed
 */
export const hasFailed = (response: any): Chainable<any> => {
  expect(response.status).to.be.greaterThan(399);
  return cy.wrap(response);
};

/**
 * Check if request succeeded
 */
export const hasSucceeded = (response: any): Chainable<any> => {
  expect(response.status).to.be.lessThan(400);
  return cy.wrap(response);
}; 