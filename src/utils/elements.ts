import { Chainable } from 'cypress';
import { ElementWaitOptions } from '../types';

// ===== BASIC ELEMENT UTILITIES =====

/**
 * Wait for an element to be present and visible
 */
export const waitForElement = (selector: string, timeout = 10000): Chainable<any> => {
  return cy.get(selector, { timeout }).should('be.visible');
};

/**
 * Wait for an element to exist (may not be visible)
 */
export const waitForElementExist = (selector: string, timeout = 10000): Chainable<any> => {
  return cy.get(selector, { timeout }).should('exist');
};

/**
 * Assert text content of an element
 */
export const assertText = (selector: string, expectedText: string): Chainable<any> => {
  return cy.get(selector).should('contain.text', expectedText);
};

/**
 * Assert element is visible
 */
export const assertElementVisible = (selector: string): Chainable<any> => {
  return cy.get(selector).should('be.visible');
};

/**
 * Assert element is not visible
 */
export const assertElementNotVisible = (selector: string): Chainable<any> => {
  return cy.get(selector).should('not.be.visible');
};

/**
 * Click element and wait for something
 */
export const clickAndWait = (selector: string, waitFor?: string): Chainable<any> => {
  const chain = cy.get(selector).click();
  
  if (waitFor) {
    return chain.get(waitFor, { timeout: 10000 });
  }
  
  return chain;
};

/**
 * Fill a form with data
 */
export const fillForm = (formData: Record<string, string>): Chainable<any> => {
  let chain: Chainable<any> = cy.wrap(null);
  
  Object.entries(formData).forEach(([selector, value]) => {
    chain = chain.then(() => {
      cy.get(selector).clear().type(value);
    });
  });
  
  return chain;
};

/**
 * Scroll to an element
 */
export const scrollToElement = (selector: string): Chainable<any> => {
  return cy.get(selector).scrollIntoView();
};

/**
 * Take a screenshot
 */
export const takeScreenshot = (name?: string): Chainable<any> => {
  if (name) {
    return cy.screenshot(name);
  }
  return cy.screenshot();
};

/**
 * Wait for element with custom options
 */
export const waitForElementWithOptions = (
  selector: string, 
  options: ElementWaitOptions = {}
): Chainable<any> => {
  const { timeout = 10000, visible = true, exist = true } = options;
  
  let chain = cy.get(selector, { timeout });
  
  if (exist) {
    chain = chain.should('exist');
  }
  
  if (visible) {
    chain = chain.should('be.visible');
  }
  
  return chain;
};

// ===== ENHANCED UI INTERACTIONS =====

/**
 * Drag an element from one place to another
 */
export const dragTo = (
  fromSelector: string,
  toSelector: string
): Chainable<any> => {
  return cy
    .get(fromSelector)
    .should('be.visible')
    .trigger('mousedown', { button: 0 })
    .get(toSelector)
    .should('be.visible')
    .trigger('mousemove')
    .trigger('mouseup');
};

/**
 * Scroll to make an element visible
 */
export const scrollTo = (selector: string): Chainable<any> => {
  return cy.get(selector).scrollIntoView();
};

/**
 * Click multiple elements in order
 */
export const clickAll = (selectors: string[]): Chainable<any> => {
  let chain = cy.wrap(null);
  
  selectors.forEach((selector) => {
    chain = chain.then(() => {
      cy.get(selector).click();
    });
  });
  
  return chain;
};

/**
 * Upload a file to an input
 */
export const uploadFile = (selector: string, filePath: string): Chainable<any> => {
  return cy.get(selector).selectFile(filePath);
};

/**
 * Wait for element to be ready for interaction
 */
export const waitForReady = (selector: string, timeout = 10000): Chainable<any> => {
  return cy
    .get(selector, { timeout })
    .should('be.visible')
    .should('not.be.disabled');
};

/**
 * Fill out a form with data
 */
export const fillFormData = (formData: Record<string, string>): Chainable<any> => {
  let chain = cy.wrap(null);
  
  Object.entries(formData).forEach(([selector, value]) => {
    chain = chain.then(() => {
      cy.get(selector).clear().type(value);
    });
  });
  
  return chain;
};

/**
 * Wait for loading to finish
 */
export const waitForLoading = (spinnerSelector = '.loading, .spinner'): Chainable<any> => {
  return cy.get(spinnerSelector, { timeout: 10000 }).should('not.exist');
};

/**
 * Check if element contains specific text
 */
export const containsText = (selector: string, text: string): Chainable<any> => {
  return cy.get(selector).should('contain.text', text);
};

/**
 * Check if element is visible
 */
export const isVisible = (selector: string): Chainable<any> => {
  return cy.get(selector).should('be.visible');
};

/**
 * Check if element is hidden
 */
export const isHidden = (selector: string): Chainable<any> => {
  return cy.get(selector).should('not.be.visible');
};

/**
 * Click something and wait for a result
 */
export const clickAndWaitFor = (
  clickSelector: string,
  waitForSelector: string,
  timeout = 10000
): Chainable<any> => {
  return cy
    .get(clickSelector)
    .click()
    .get(waitForSelector, { timeout })
    .should('be.visible');
};

/**
 * Wait for page to finish loading
 */
export const waitForPageReady = (timeout = 15000): Chainable<any> => {
  return cy.window({ timeout }).then((win) => {
    if (win.document.readyState === 'complete') {
      return cy.wrap(null);
    }
    
    return new Promise((resolve) => {
      win.addEventListener('load', resolve);
    });
  });
};

/**
 * Check if checkbox is checked
 */
export const isChecked = (selector: string): Chainable<any> => {
  return cy.get(selector).should('be.checked');
};

/**
 * Check if checkbox is unchecked
 */
export const isUnchecked = (selector: string): Chainable<any> => {
  return cy.get(selector).should('not.be.checked');
};

/**
 * Select an option from dropdown
 */
export const selectOption = (selector: string, value: string): Chainable<any> => {
  return cy.get(selector).select(value);
};

/**
 * Type text with delay (useful for slow typing)
 */
export const typeSlowly = (selector: string, text: string, delay = 100): Chainable<any> => {
  return cy.get(selector).type(text, { delay });
};

/**
 * Clear a field and type new text
 */
export const clearAndType = (selector: string, text: string): Chainable<any> => {
  return cy.get(selector).clear().type(text);
};

/**
 * Hover over an element
 */
export const hoverOver = (selector: string): Chainable<any> => {
  return cy.get(selector).trigger('mouseover');
};

/**
 * Right click on an element
 */
export const rightClick = (selector: string): Chainable<any> => {
  return cy.get(selector).rightclick();
};

/**
 * Double click on an element
 */
export const doubleClick = (selector: string): Chainable<any> => {
  return cy.get(selector).dblclick();
}; 