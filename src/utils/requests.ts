import { Chainable } from '../types';
import { RequestOptions } from '../types';

// ===== BASIC REQUEST UTILITIES =====

/**
 * GET request wrapper
 */
export const getRequest = <T = unknown>(
  url: string,
  options?: RequestOptions
): Chainable<Cypress.Response<T>> => {
  return cy.request<T>({ method: 'GET', url, ...options });
};

/**
 * POST request wrapper
 */
export const postRequest = <T = unknown>(
  url: string,
  body?: unknown,
  options?: RequestOptions
): Chainable<Cypress.Response<T>> => {
  return cy.request<T>({ method: 'POST', url, body: body as string | object, ...options });
};

/**
 * PUT request wrapper
 */
export const putRequest = <T = unknown>(
  url: string,
  body?: unknown,
  options?: RequestOptions
): Chainable<Cypress.Response<T>> => {
  return cy.request<T>({ method: 'PUT', url, body: body as string | object, ...options });
};

/**
 * DELETE request wrapper
 */
export const deleteRequest = <T = unknown>(
  url: string,
  options?: RequestOptions
): Chainable<Cypress.Response<T>> => {
  return cy.request<T>({ method: 'DELETE', url, ...options });
};

/**
 * PATCH request wrapper
 */
export const patchRequest = <T = unknown>(
  url: string,
  body?: unknown,
  options?: RequestOptions
): Chainable<Cypress.Response<T>> => {
  return cy.request<T>({ method: 'PATCH', url, body: body as string | object, ...options });
};

/**
 * Request with custom method
 */
export const request = <T = unknown>(
  method: string,
  url: string,
  body?: unknown,
  options?: RequestOptions
): Chainable<Cypress.Response<T>> => {
  return cy.request<T>({ method, url, body: body as string | object, ...options });
};

/**
 * Wait for a specific request to complete (must be intercepted and aliased beforehand)
 */
export const waitForRequest = (
  method: string,
  url: string,
  timeout = 10000
): Chainable<unknown> => {
  return cy.wait(`@${method}:${url}`, { timeout }) as unknown as Chainable<unknown>;
};

/**
 * Intercept and stub a request
 */
export const interceptRequest = (
  method: string,
  url: string,
  response: unknown
): Chainable<null> => {
  const intercept = cy.intercept as (m: string, u: string, r: unknown) => Chainable<null>;
  intercept(method, url, response);
  return cy.wrap(null);
};

// ===== ENHANCED REQUEST UTILITIES (backwards-compatible aliases) =====

/** @alias getRequest */
export const getData = getRequest;
/** @alias postRequest */
export const postData = postRequest;
/** @alias putRequest */
export const updateData = putRequest;
/** @alias deleteRequest */
export const deleteData = deleteRequest;
/** @alias request */
export const makeRequest = request;
/** @alias waitForRequest */
export const waitForRequestToFinish = waitForRequest;
/** @alias interceptRequest */
export const mockRequest = interceptRequest;

/**
 * Assert response has the expected HTTP status code
 */
export const hasStatus = (
  response: Cypress.Response<unknown>,
  status: number
): Chainable<Cypress.Response<unknown>> => {
  expect(response.status).to.eq(status);
  return cy.wrap(response);
};

/**
 * Assert response body contains a key with the given value
 */
export const containsData = (
  response: Cypress.Response<Record<string, unknown>>,
  key: string,
  value: unknown
): Chainable<Cypress.Response<Record<string, unknown>>> => {
  expect(response.body[key]).to.eq(value);
  return cy.wrap(response);
};

/**
 * Assert response body is an array
 */
export const isArray = (
  response: Cypress.Response<unknown>
): Chainable<Cypress.Response<unknown>> => {
  expect(response.body).to.be.an('array');
  return cy.wrap(response);
};

/**
 * Assert response body is an object
 */
export const isObject = (
  response: Cypress.Response<unknown>
): Chainable<Cypress.Response<unknown>> => {
  expect(response.body).to.be.an('object');
  return cy.wrap(response);
};

/**
 * Extract a field from the response body (or the whole body if no key given)
 */
export const getResponseData = (
  response: Cypress.Response<Record<string, unknown>>,
  key?: string
): Chainable<unknown> => {
  if (key) {
    return cy.wrap(response.body[key]) as Chainable<unknown>;
  }
  return cy.wrap(response.body) as Chainable<unknown>;
};

/**
 * Make request with custom headers
 */
export const requestWithHeaders = <T = unknown>(
  method: string,
  url: string,
  data?: unknown,
  headers?: Record<string, string>
): Chainable<Cypress.Response<T>> => {
  const opts = headers ? { headers } : {};
  return cy.request<T>({ method, url, body: data as string | object, ...opts });
};

/**
 * Make request with Bearer authorization token
 */
export const requestWithToken = <T = unknown>(
  method: string,
  url: string,
  token: string,
  data?: unknown
): Chainable<Cypress.Response<T>> => {
  return cy.request<T>({
    method,
    url,
    body: data as string | object,
    headers: { Authorization: `Bearer ${token}` },
  });
};

/**
 * Make request and return its response (cy.request already resolves on completion)
 */
export const requestAndWait = <T = unknown>(
  method: string,
  url: string,
  data?: unknown,
  options?: RequestOptions
): Chainable<Cypress.Response<T>> => {
  return cy.request<T>({ method, url, body: data as string | object, ...options });
};

/**
 * Assert request failed (status > 399)
 */
export const hasFailed = (
  response: Cypress.Response<unknown>
): Chainable<Cypress.Response<unknown>> => {
  expect(response.status).to.be.greaterThan(399);
  return cy.wrap(response);
};

/**
 * Assert request succeeded (status < 400)
 */
export const hasSucceeded = (
  response: Cypress.Response<unknown>
): Chainable<Cypress.Response<unknown>> => {
  expect(response.status).to.be.lessThan(400);
  return cy.wrap(response);
};
