import type { UserData, AddressData, ProductData, OrderData } from '../types';
import * as utils from '../utils';

declare global {
  namespace Cypress {
    interface Chainable {
      // Navigation commands
      visitAndWait: (url: string, waitForSelector?: string) => Chainable<JQuery<HTMLElement>>;
      visitAndWaitForIdle: (url: string, timeout?: number) => Chainable<null>;
      reloadPage: () => Chainable<AUTWindow>;
      goBack: () => Chainable<AUTWindow>;
      goForward: () => Chainable<AUTWindow>;

      // Request commands
      getRequest: <T = unknown>(
        url: string,
        options?: Partial<Cypress.RequestOptions>
      ) => Chainable<Response<T>>;
      postRequest: <T = unknown>(
        url: string,
        body?: unknown,
        options?: Partial<Cypress.RequestOptions>
      ) => Chainable<Response<T>>;
      putRequest: <T = unknown>(
        url: string,
        body?: unknown,
        options?: Partial<Cypress.RequestOptions>
      ) => Chainable<Response<T>>;
      deleteRequest: <T = unknown>(
        url: string,
        options?: Partial<Cypress.RequestOptions>
      ) => Chainable<Response<T>>;
      patchRequest: <T = unknown>(
        url: string,
        body?: unknown,
        options?: Partial<Cypress.RequestOptions>
      ) => Chainable<Response<T>>;

      // Element commands
      waitForElement: (selector: string, timeout?: number) => Chainable<JQuery<HTMLElement>>;
      waitForElementExist: (selector: string, timeout?: number) => Chainable<JQuery<HTMLElement>>;
      assertText: (selector: string, expectedText: string) => Chainable<JQuery<HTMLElement>>;
      assertElementVisible: (selector: string) => Chainable<JQuery<HTMLElement>>;
      assertElementNotVisible: (selector: string) => Chainable<JQuery<HTMLElement>>;
      clickAndWait: (selector: string, waitFor?: string) => Chainable<JQuery<HTMLElement>>;
      fillForm: (formData: Record<string, string>) => Chainable<null>;
      scrollToElement: (selector: string) => Chainable<JQuery<HTMLElement>>;
      takeScreenshot: (name?: string) => Chainable<null>;

      // Network commands
      waitForNetworkIdle: (timeout?: number) => Chainable<null>;
      waitForNetworkRequest: (method: string, url: string, timeout?: number) => Chainable<unknown>;
      interceptNetworkRequest: (method: string, url: string, response: unknown) => Chainable<null>;

      // Storage commands
      setLocalStorage: (key: string, value: string) => Chainable<null>;
      getLocalStorage: (key: string) => Chainable<string | null>;
      removeLocalStorage: (key: string) => Chainable<null>;
      hasLocalStorageKey: (key: string) => Chainable<boolean>;
      getLocalStorageKeys: () => Chainable<string[]>;
      getLocalStorageSize: () => Chainable<number>;
      setMultipleLocalStorage: (data: Record<string, string>) => Chainable<null>;
      clearSessionStorage: () => Chainable<null>;
      setSessionStorage: (key: string, value: string) => Chainable<null>;
      getSessionStorage: (key: string) => Chainable<string | null>;
      removeSessionStorage: (key: string) => Chainable<null>;
      hasSessionStorageKey: (key: string) => Chainable<boolean>;

      // Enhanced UI commands
      dragTo: (fromSelector: string, toSelector: string) => Chainable<JQuery<HTMLElement>>;
      clickAll: (selectors: string[]) => Chainable<null>;
      uploadFile: (selector: string, filePath: string) => Chainable<JQuery<HTMLElement>>;
      waitForReady: (selector: string, timeout?: number) => Chainable<JQuery<HTMLElement>>;
      fillFormData: (formData: Record<string, string>) => Chainable<null>;
      waitForLoading: (spinnerSelector?: string) => Chainable<JQuery<HTMLElement>>;
      containsText: (selector: string, text: string) => Chainable<JQuery<HTMLElement>>;
      isVisible: (selector: string) => Chainable<JQuery<HTMLElement>>;
      isHidden: (selector: string) => Chainable<JQuery<HTMLElement>>;
      clickAndWaitFor: (
        clickSelector: string,
        waitForSelector: string,
        timeout?: number
      ) => Chainable<JQuery<HTMLElement>>;
      waitForPageReady: (timeout?: number) => Chainable<null>;
      isChecked: (selector: string) => Chainable<JQuery<HTMLElement>>;
      isUnchecked: (selector: string) => Chainable<JQuery<HTMLElement>>;
      selectOption: (selector: string, value: string) => Chainable<JQuery<HTMLElement>>;
      typeSlowly: (
        selector: string,
        text: string,
        delay?: number
      ) => Chainable<JQuery<HTMLElement>>;
      clearAndType: (selector: string, text: string) => Chainable<JQuery<HTMLElement>>;
      hoverOver: (selector: string) => Chainable<JQuery<HTMLElement>>;
      rightClick: (selector: string) => Chainable<JQuery<HTMLElement>>;
      doubleClick: (selector: string) => Chainable<JQuery<HTMLElement>>;
      focusElement: (selector: string) => Chainable<JQuery<HTMLElement>>;
      blurElement: (selector: string) => Chainable<JQuery<HTMLElement>>;
      pressKey: (selector: string, key: string) => Chainable<JQuery<HTMLElement>>;
      pressKeySequence: (selector: string, keys: string[]) => Chainable<JQuery<HTMLElement>>;
      selectAllText: (selector: string) => Chainable<JQuery<HTMLElement>>;
      selectTextRange: (
        selector: string,
        start: number,
        end: number
      ) => Chainable<JQuery<HTMLElement>>;
      copyToClipboard: (selector: string) => Chainable<JQuery<HTMLElement>>;
      pasteFromClipboard: (selector: string) => Chainable<JQuery<HTMLElement>>;
      undoAction: (selector: string) => Chainable<JQuery<HTMLElement>>;
      redoAction: (selector: string) => Chainable<JQuery<HTMLElement>>;
      toggleElement: (selector: string) => Chainable<JQuery<HTMLElement>>;
      isEnabled: (selector: string) => Chainable<JQuery<HTMLElement>>;
      isDisabled: (selector: string) => Chainable<JQuery<HTMLElement>>;
      isRequired: (selector: string) => Chainable<JQuery<HTMLElement>>;
      hasAttribute: (
        selector: string,
        attribute: string,
        value?: string
      ) => Chainable<JQuery<HTMLElement>>;
      hasClass: (selector: string, className: string) => Chainable<JQuery<HTMLElement>>;
      hasCSSProperty: (
        selector: string,
        property: string,
        value: string
      ) => Chainable<JQuery<HTMLElement>>;
      waitForText: (
        selector: string,
        text: string,
        timeout?: number
      ) => Chainable<JQuery<HTMLElement>>;
      waitForNoText: (
        selector: string,
        text: string,
        timeout?: number
      ) => Chainable<JQuery<HTMLElement>>;
      waitForElementCount: (
        selector: string,
        count: number,
        timeout?: number
      ) => Chainable<JQuery<HTMLElement>>;
      waitForEmpty: (selector: string, timeout?: number) => Chainable<JQuery<HTMLElement>>;
      waitForNotEmpty: (selector: string, timeout?: number) => Chainable<JQuery<HTMLElement>>;

      // Enhanced request commands (aliases)
      getData: <T = unknown>(
        url: string,
        options?: Partial<Cypress.RequestOptions>
      ) => Chainable<Response<T>>;
      postData: <T = unknown>(
        url: string,
        body?: unknown,
        options?: Partial<Cypress.RequestOptions>
      ) => Chainable<Response<T>>;
      updateData: <T = unknown>(
        url: string,
        body?: unknown,
        options?: Partial<Cypress.RequestOptions>
      ) => Chainable<Response<T>>;
      deleteData: <T = unknown>(
        url: string,
        options?: Partial<Cypress.RequestOptions>
      ) => Chainable<Response<T>>;
      makeRequest: <T = unknown>(
        method: string,
        url: string,
        body?: unknown,
        options?: Partial<Cypress.RequestOptions>
      ) => Chainable<Response<T>>;
      waitForRequestToFinish: (method: string, url: string, timeout?: number) => Chainable<unknown>;
      mockRequest: (method: string, url: string, response: unknown) => Chainable<null>;
      hasStatus: (response: Response<unknown>, status: number) => Chainable<Response<unknown>>;
      containsData: (
        response: Response<Record<string, unknown>>,
        key: string,
        value: unknown
      ) => Chainable<Response<Record<string, unknown>>>;
      isArray: (response: Response<unknown>) => Chainable<Response<unknown>>;
      isObject: (response: Response<unknown>) => Chainable<Response<unknown>>;
      getResponseData: (
        response: Response<Record<string, unknown>>,
        key?: string
      ) => Chainable<unknown>;
      requestWithHeaders: <T = unknown>(
        method: string,
        url: string,
        data?: unknown,
        headers?: Record<string, string>
      ) => Chainable<Response<T>>;
      requestWithToken: <T = unknown>(
        method: string,
        url: string,
        token: string,
        data?: unknown
      ) => Chainable<Response<T>>;
      requestAndWait: <T = unknown>(
        method: string,
        url: string,
        data?: unknown,
        options?: Partial<Cypress.RequestOptions>
      ) => Chainable<Response<T>>;
      hasFailed: (response: Response<unknown>) => Chainable<Response<unknown>>;
      hasSucceeded: (response: Response<unknown>) => Chainable<Response<unknown>>;

      // Test data commands
      createTestData: (
        template: Record<string, unknown>,
        count?: number
      ) => Record<string, unknown> | Record<string, unknown>[];
      createRandomEmail: () => string;
      createRandomString: (length?: number) => string;
      createRandomPhone: () => string;
      createRandomDate: (startYear?: number, endYear?: number) => Date;
      createUserData: (count?: number) => UserData | UserData[];
      createAddressData: (count?: number) => AddressData | AddressData[];
      createProductData: (count?: number) => ProductData | ProductData[];
      createOrderData: (count?: number) => OrderData | OrderData[];
      createRandomNumbers: (count: number, min?: number, max?: number) => number[];
      createRandomColor: () => string;
      createRandomBoolean: () => boolean;
      createDataWithValues: (values: Record<string, unknown>) => Record<string, unknown>;
      createDataWithOverrides: (
        baseTemplate: Record<string, unknown>,
        overrides: Record<string, unknown>
      ) => Record<string, unknown>;
    }
  }
}

// Extend Cypress commands
export const extendCypressCommands = (): void => {
  // Navigation commands
  Cypress.Commands.add('visitAndWait', utils.visitAndWait);
  Cypress.Commands.add('visitAndWaitForIdle', utils.visitAndWaitForIdle);
  Cypress.Commands.add('reloadPage', utils.reload);
  Cypress.Commands.add('goBack', utils.goBack);
  Cypress.Commands.add('goForward', utils.goForward);

  // Request commands
  Cypress.Commands.add('getRequest', utils.getRequest);
  Cypress.Commands.add('postRequest', utils.postRequest);
  Cypress.Commands.add('putRequest', utils.putRequest);
  Cypress.Commands.add('deleteRequest', utils.deleteRequest);
  Cypress.Commands.add('patchRequest', utils.patchRequest);

  // Element commands
  Cypress.Commands.add('waitForElement', utils.waitForElement);
  Cypress.Commands.add('waitForElementExist', utils.waitForElementExist);
  Cypress.Commands.add('assertText', utils.assertText);
  Cypress.Commands.add('assertElementVisible', utils.assertElementVisible);
  Cypress.Commands.add('assertElementNotVisible', utils.assertElementNotVisible);
  Cypress.Commands.add('clickAndWait', utils.clickAndWait);
  Cypress.Commands.add('fillForm', utils.fillForm);
  Cypress.Commands.add('scrollToElement', utils.scrollToElement);
  Cypress.Commands.add('takeScreenshot', utils.takeScreenshot);

  // Network commands
  Cypress.Commands.add('waitForNetworkIdle', utils.waitForNetworkIdle);
  Cypress.Commands.add('waitForNetworkRequest', utils.waitForNetworkRequest);
  Cypress.Commands.add('interceptNetworkRequest', utils.interceptNetworkRequest);

  // Enhanced UI commands
  Cypress.Commands.add('dragTo', utils.dragTo);
  Cypress.Commands.add('scrollToElement', utils.scrollTo);
  Cypress.Commands.add('uploadFile', utils.uploadFile);
  Cypress.Commands.add('waitForReady', utils.waitForReady);
  Cypress.Commands.add('fillFormData', utils.fillFormData);
  Cypress.Commands.add('waitForLoading', utils.waitForLoading);
  Cypress.Commands.add('containsText', utils.containsText);
  Cypress.Commands.add('isVisible', utils.isVisible);
  Cypress.Commands.add('isHidden', utils.isHidden);
  Cypress.Commands.add('clickAndWaitFor', utils.clickAndWaitFor);
  Cypress.Commands.add('waitForPageReady', utils.waitForPageReady);
  Cypress.Commands.add('isChecked', utils.isChecked);
  Cypress.Commands.add('isUnchecked', utils.isUnchecked);
  Cypress.Commands.add('selectOption', utils.selectOption);
  Cypress.Commands.add('typeSlowly', utils.typeSlowly);
  Cypress.Commands.add('clearAndType', utils.clearAndType);
  Cypress.Commands.add('hoverOver', utils.hoverOver);
  Cypress.Commands.add('rightClick', utils.rightClick);
  Cypress.Commands.add('doubleClick', utils.doubleClick);
  Cypress.Commands.add('focusElement', utils.focusElement);
  Cypress.Commands.add('blurElement', utils.blurElement);
  Cypress.Commands.add('pressKey', utils.pressKey);
  Cypress.Commands.add('pressKeySequence', utils.pressKeySequence);
  Cypress.Commands.add('selectAllText', utils.selectAllText);
  Cypress.Commands.add('selectTextRange', utils.selectTextRange);
  Cypress.Commands.add('copyToClipboard', utils.copyToClipboard);
  Cypress.Commands.add('pasteFromClipboard', utils.pasteFromClipboard);
  Cypress.Commands.add('undoAction', utils.undoAction);
  Cypress.Commands.add('redoAction', utils.redoAction);
  Cypress.Commands.add('toggleElement', utils.toggleElement);
  Cypress.Commands.add('isEnabled', utils.isEnabled);
  Cypress.Commands.add('isDisabled', utils.isDisabled);
  Cypress.Commands.add('isRequired', utils.isRequired);
  Cypress.Commands.add('hasAttribute', utils.hasAttribute);
  Cypress.Commands.add('hasClass', utils.hasClass);
  Cypress.Commands.add('hasCSSProperty', utils.hasCSSProperty);
  Cypress.Commands.add('waitForText', utils.waitForText);
  Cypress.Commands.add('waitForNoText', utils.waitForNoText);
  Cypress.Commands.add('waitForElementCount', utils.waitForElementCount);
  Cypress.Commands.add('waitForEmpty', utils.waitForEmpty);
  Cypress.Commands.add('waitForNotEmpty', utils.waitForNotEmpty);

  // Enhanced request commands
  Cypress.Commands.add('getData', utils.getData);
  Cypress.Commands.add('postData', utils.postData);
  Cypress.Commands.add('updateData', utils.updateData);
  Cypress.Commands.add('deleteData', utils.deleteData);
  Cypress.Commands.add('makeRequest', utils.makeRequest);
  Cypress.Commands.add('waitForRequestToFinish', utils.waitForRequestToFinish);
  Cypress.Commands.add('mockRequest', utils.mockRequest);
  Cypress.Commands.add('hasStatus', utils.hasStatus);
  Cypress.Commands.add('containsData', utils.containsData);
  Cypress.Commands.add('isArray', utils.isArray);
  Cypress.Commands.add('isObject', utils.isObject);
  Cypress.Commands.add('getResponseData', utils.getResponseData);
  Cypress.Commands.add('requestWithHeaders', utils.requestWithHeaders);
  Cypress.Commands.add('requestWithToken', utils.requestWithToken);
  Cypress.Commands.add('requestAndWait', utils.requestAndWait);
  Cypress.Commands.add('hasFailed', utils.hasFailed);
  Cypress.Commands.add('hasSucceeded', utils.hasSucceeded);

  // Test data commands
  Cypress.Commands.add('createTestData', utils.createTestData);
  Cypress.Commands.add('createRandomEmail', utils.createRandomEmail);
  Cypress.Commands.add('createRandomString', utils.createRandomString);
  Cypress.Commands.add('createRandomPhone', utils.createRandomPhone);
  Cypress.Commands.add('createRandomDate', utils.createRandomDate);
  Cypress.Commands.add('createUserData', utils.createUserData);
  Cypress.Commands.add('createAddressData', utils.createAddressData);
  Cypress.Commands.add('createProductData', utils.createProductData);
  Cypress.Commands.add('createOrderData', utils.createOrderData);
  Cypress.Commands.add('createRandomNumbers', utils.createRandomNumbers);
  Cypress.Commands.add('createRandomColor', utils.createRandomColor);
  Cypress.Commands.add('createRandomBoolean', utils.createRandomBoolean);
  Cypress.Commands.add('createDataWithValues', utils.createDataWithValues);
  Cypress.Commands.add('createDataWithOverrides', utils.createDataWithOverrides);

  // Storage commands
  Cypress.Commands.add('setLocalStorage', utils.setLocalStorage);
  Cypress.Commands.add('getLocalStorage', utils.getLocalStorage);
  Cypress.Commands.add('removeLocalStorage', utils.removeLocalStorage);
  Cypress.Commands.add('hasLocalStorageKey', utils.hasLocalStorageKey);
  Cypress.Commands.add('getLocalStorageKeys', utils.getLocalStorageKeys);
  Cypress.Commands.add('getLocalStorageSize', utils.getLocalStorageSize);
  Cypress.Commands.add('setMultipleLocalStorage', utils.setMultipleLocalStorage);
  Cypress.Commands.add('clearSessionStorage', utils.clearSessionStorage);
  Cypress.Commands.add('setSessionStorage', utils.setSessionStorage);
  Cypress.Commands.add('getSessionStorage', utils.getSessionStorage);
  Cypress.Commands.add('removeSessionStorage', utils.removeSessionStorage);
  Cypress.Commands.add('hasSessionStorageKey', utils.hasSessionStorageKey);
};
