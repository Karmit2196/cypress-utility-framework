import { Chainable, NetworkIdleOptions } from '../types';

/**
 * Wait for network to be idle.
 *
 * Registers a catch-all intercept that tracks in-flight requests via a closure
 * counter, then polls every 100 ms until the count reaches zero.
 * The initial cy.wait(0) yields to the Cypress command queue so the intercept
 * handler is registered before any pending commands fire.
 */
export const waitForNetworkIdle = (timeout = 10000): Chainable<null> => {
  let pendingCount = 0;

  cy.intercept('**', req => {
    pendingCount++;
    req.on('response', () => {
      pendingCount--;
    });
  });

  const deadline = Date.now() + timeout;

  const poll = (): Chainable<null> => {
    if (Date.now() > deadline) {
      throw new Error(`waitForNetworkIdle: network did not become idle within ${timeout}ms`);
    }
    if (pendingCount === 0) return cy.wrap(null);
    return cy.wait(100).then(poll);
  };

  return cy.wait(0).then(poll);
};

/**
 * Wait for network idle with custom options (debounce + max pending threshold).
 */
export const waitForNetworkIdleWithOptions = (
  options: NetworkIdleOptions = {}
): Chainable<null> => {
  const { timeout = 10000, minIdleTime = 500, maxPendingRequests = 0 } = options;

  let pendingCount = 0;
  let firstIdleAt: number | null = null;

  cy.intercept('**', req => {
    pendingCount++;
    firstIdleAt = null; // new request resets the idle window
    req.on('response', () => {
      pendingCount--;
    });
  });

  const deadline = Date.now() + timeout;

  const poll = (): Chainable<null> => {
    if (Date.now() > deadline) {
      throw new Error(
        `waitForNetworkIdleWithOptions: network did not become idle within ${timeout}ms`
      );
    }
    if (pendingCount <= maxPendingRequests) {
      if (firstIdleAt === null) firstIdleAt = Date.now();
      if (Date.now() - firstIdleAt >= minIdleTime) return cy.wrap(null);
    } else {
      firstIdleAt = null;
    }
    return cy.wait(100).then(poll);
  };

  return cy.wait(0).then(poll);
};

/**
 * Wait for a specific network request (must be intercepted and aliased beforehand).
 */
export const waitForNetworkRequest = (
  method: string,
  url: string,
  timeout = 10000
): Chainable<unknown> => {
  return cy.wait(`@${method}:${url}`, { timeout }) as unknown as Chainable<unknown>;
};

/**
 * Intercept a network request and stub its response.
 */
export const interceptNetworkRequest = (
  method: string,
  url: string,
  response: unknown
): Chainable<null> => {
  const intercept = cy.intercept as (m: string, u: string, r: unknown) => Chainable<null>;
  intercept(method, url, response);
  return cy.wrap(null);
};

/**
 * Intercept and stub multiple requests in one call.
 */
export const interceptMultipleRequests = (
  interceptions: Array<{ method: string; url: string; response: unknown }>
): Chainable<null> => {
  const intercept = cy.intercept as (m: string, u: string, r: unknown) => Chainable<null>;
  interceptions.forEach(({ method, url, response }) => {
    intercept(method, url, response);
  });
  return cy.wrap(null);
};

/**
 * Wait for all in-flight requests that have already started to finish.
 *
 * Resolves once every request tracked by the intercept has received a response.
 * If no requests are observed within the first 500 ms, resolves immediately.
 */
export const waitForAllRequests = (timeout = 30000): Chainable<null> => {
  let pendingCount = 0;
  let started = false;

  cy.intercept('**', req => {
    pendingCount++;
    started = true;
    req.on('response', () => {
      pendingCount--;
    });
  });

  const deadline = Date.now() + timeout;
  const noActivityDeadline = Date.now() + 500;

  const poll = (): Chainable<null> => {
    if (Date.now() > deadline) {
      throw new Error(`waitForAllRequests: requests did not complete within ${timeout}ms`);
    }
    if (started && pendingCount === 0) return cy.wrap(null);
    if (!started && Date.now() > noActivityDeadline) return cy.wrap(null);
    return cy.wait(100).then(poll);
  };

  return cy.wait(0).then(poll);
};
