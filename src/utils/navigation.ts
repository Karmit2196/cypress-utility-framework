import { Chainable } from 'cypress';

/**
 * Enhanced visit command with additional options
 */
export const visit = (url: string, options?: any): Chainable<any> => {
  return cy.visit(url, options);
};

/**
 * Visit a page and wait for it to be ready
 */
export const visitAndWait = (url: string, waitForSelector?: string): Chainable<any> => {
  const chain = cy.visit(url);
  
  if (waitForSelector) {
    return chain.get(waitForSelector, { timeout: 10000 });
  }
  
  return chain;
};

/**
 * Visit a page and wait for network idle
 */
export const visitAndWaitForIdle = (url: string, timeout = 10000): Chainable<any> => {
  return cy.visit(url).waitForNetworkIdle(timeout);
};

/**
 * Reload the current page
 */
export const reload = (): Chainable<any> => {
  return cy.reload();
};

/**
 * Go back to previous page
 */
export const goBack = (): Chainable<any> => {
  return cy.go('back');
};

/**
 * Go forward to next page
 */
export const goForward = (): Chainable<any> => {
  return cy.go('forward');
}; 