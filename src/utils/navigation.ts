import { Chainable } from '../types';

/**
 * Enhanced visit command with additional options
 */
export const visit = (
  url: string,
  options?: Partial<Cypress.VisitOptions>
): Chainable<Cypress.AUTWindow> => {
  return cy.visit(url, options);
};

/**
 * Visit a page and wait for a selector to appear
 */
export const visitAndWait = (
  url: string,
  waitForSelector?: string
): Chainable<JQuery<HTMLElement>> => {
  const chain = cy.visit(url);

  if (waitForSelector) {
    return chain.get(waitForSelector, { timeout: 10000 });
  }

  return chain as unknown as Chainable<JQuery<HTMLElement>>;
};

/**
 * Visit a page and wait for network idle
 */
export const visitAndWaitForIdle = (url: string, timeout = 10000): Chainable<null> => {
  return cy.visit(url).waitForNetworkIdle(timeout);
};

/**
 * Reload the current page
 */
export const reload = (): Chainable<Cypress.AUTWindow> => {
  return cy.reload();
};

/**
 * Go back to previous page
 */
export const goBack = (): Chainable<Cypress.AUTWindow> => {
  return cy.go('back');
};

/**
 * Go forward to next page
 */
export const goForward = (): Chainable<Cypress.AUTWindow> => {
  return cy.go('forward');
};
