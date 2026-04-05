import { Chainable } from '../types';

// ===== LOCAL STORAGE UTILITIES =====

/**
 * Clear all local storage
 */
export const clearLocalStorage = (): Chainable<string[]> => {
  return cy.clearLocalStorage() as unknown as Chainable<string[]>;
};

/**
 * Set a value in local storage
 */
export const setLocalStorage = (key: string, value: string): Chainable<null> => {
  return cy.window().then(win => {
    win.localStorage.setItem(key, value);
    return cy.wrap(null);
  });
};

/**
 * Get a value from local storage
 */
export const getLocalStorage = (key: string): Chainable<string | null> => {
  return cy.window().then(win => {
    return cy.wrap(win.localStorage.getItem(key));
  });
};

/**
 * Remove a specific key from local storage
 */
export const removeLocalStorage = (key: string): Chainable<null> => {
  return cy.window().then(win => {
    win.localStorage.removeItem(key);
    return cy.wrap(null);
  });
};

/**
 * Check if local storage contains a key
 */
export const hasLocalStorageKey = (key: string): Chainable<boolean> => {
  return cy.window().then(win => {
    return win.localStorage.getItem(key) !== null;
  });
};

/**
 * Get all local storage keys
 */
export const getLocalStorageKeys = (): Chainable<string[]> => {
  return cy.window().then(win => {
    return Object.keys(win.localStorage);
  });
};

/**
 * Get local storage size
 */
export const getLocalStorageSize = (): Chainable<number> => {
  return cy.window().then(win => {
    return win.localStorage.length;
  });
};

/**
 * Set multiple local storage values
 */
export const setMultipleLocalStorage = (data: Record<string, string>): Chainable<null> => {
  return cy.window().then(win => {
    Object.entries(data).forEach(([key, value]) => {
      win.localStorage.setItem(key, value);
    });
    return cy.wrap(null);
  });
};

/**
 * Get all local storage data
 */
export const getAllLocalStorage = (): Chainable<Record<string, string>> => {
  return cy.window().then(win => {
    const data: Record<string, string> = {};
    for (let i = 0; i < win.localStorage.length; i++) {
      const key = win.localStorage.key(i);
      if (key) {
        data[key] = win.localStorage.getItem(key) || '';
      }
    }
    return data;
  });
};

// ===== SESSION STORAGE UTILITIES =====

/**
 * Clear all session storage
 */
export const clearSessionStorage = (): Chainable<null> => {
  return cy.window().then(win => {
    win.sessionStorage.clear();
    return cy.wrap(null);
  });
};

/**
 * Set a value in session storage
 */
export const setSessionStorage = (key: string, value: string): Chainable<null> => {
  return cy.window().then(win => {
    win.sessionStorage.setItem(key, value);
    return cy.wrap(null);
  });
};

/**
 * Get a value from session storage
 */
export const getSessionStorage = (key: string): Chainable<string | null> => {
  return cy.window().then(win => {
    return cy.wrap(win.sessionStorage.getItem(key));
  });
};

/**
 * Remove a specific key from session storage
 */
export const removeSessionStorage = (key: string): Chainable<null> => {
  return cy.window().then(win => {
    win.sessionStorage.removeItem(key);
    return cy.wrap(null);
  });
};

/**
 * Check if session storage contains a key
 */
export const hasSessionStorageKey = (key: string): Chainable<boolean> => {
  return cy.window().then(win => {
    return win.sessionStorage.getItem(key) !== null;
  });
};
