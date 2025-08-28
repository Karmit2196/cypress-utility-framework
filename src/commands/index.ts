import { Chainable } from 'cypress';
import * as utils from '../utils';

declare global {
  namespace Cypress {
    interface Chainable {
      // Navigation commands
      visitAndWait: (url: string, waitForSelector?: string) => Chainable<any>;
      visitAndWaitForIdle: (url: string, timeout?: number) => Chainable<any>;
      reload: () => Chainable<any>;
      goBack: () => Chainable<any>;
      goForward: () => Chainable<any>;
      
      // Request commands
      getRequest: (url: string, options?: any) => Chainable<any>;
      postRequest: (url: string, body?: any, options?: any) => Chainable<any>;
      putRequest: (url: string, body?: any, options?: any) => Chainable<any>;
      deleteRequest: (url: string, options?: any) => Chainable<any>;
      patchRequest: (url: string, body?: any, options?: any) => Chainable<any>;
      
      // Element commands
      waitForElement: (selector: string, timeout?: number) => Chainable<any>;
      waitForElementExist: (selector: string, timeout?: number) => Chainable<any>;
      assertText: (selector: string, expectedText: string) => Chainable<any>;
      assertElementVisible: (selector: string) => Chainable<any>;
      assertElementNotVisible: (selector: string) => Chainable<any>;
      clickAndWait: (selector: string, waitFor?: string) => Chainable<any>;
      fillForm: (formData: Record<string, string>) => Chainable<any>;
      scrollToElement: (selector: string) => Chainable<any>;
      takeScreenshot: (name?: string) => Chainable<any>;
      
      // Network commands
      waitForNetworkIdle: (timeout?: number) => Chainable<any>;
      waitForNetworkRequest: (method: string, url: string, timeout?: number) => Chainable<any>;
      interceptNetworkRequest: (method: string, url: string, response: any) => Chainable<any>;
      
      // Test data commands
      generateTestData: (template: any, count?: number) => any[];
      generateUserData: (count?: number) => any;
      generateAddressData: (count?: number) => any;
      
      // Enhanced UI commands
      dragTo: (fromSelector: string, toSelector: string) => Chainable<any>;
      scrollTo: (selector: string) => Chainable<any>;
      clickAll: (selectors: string[]) => Chainable<any>;
      uploadFile: (selector: string, filePath: string) => Chainable<any>;
      waitForReady: (selector: string, timeout?: number) => Chainable<any>;
      fillFormData: (formData: Record<string, string>) => Chainable<any>;
      waitForLoading: (spinnerSelector?: string) => Chainable<any>;
      containsText: (selector: string, text: string) => Chainable<any>;
      isVisible: (selector: string) => Chainable<any>;
      isHidden: (selector: string) => Chainable<any>;
      clickAndWaitFor: (clickSelector: string, waitForSelector: string, timeout?: number) => Chainable<any>;
      waitForPageReady: (timeout?: number) => Chainable<any>;
      isChecked: (selector: string) => Chainable<any>;
      isUnchecked: (selector: string) => Chainable<any>;
      selectOption: (selector: string, value: string) => Chainable<any>;
      typeSlowly: (selector: string, text: string, delay?: number) => Chainable<any>;
      clearAndType: (selector: string, text: string) => Chainable<any>;
      hoverOver: (selector: string) => Chainable<any>;
      rightClick: (selector: string) => Chainable<any>;
      doubleClick: (selector: string) => Chainable<any>;
      
      // Enhanced request commands
      getData: (url: string, options?: any) => Chainable<any>;
      postData: (url: string, data: any, options?: any) => Chainable<any>;
      updateData: (url: string, data: any, options?: any) => Chainable<any>;
      deleteData: (url: string, options?: any) => Chainable<any>;
      makeRequest: (method: string, url: string, data?: any, options?: any) => Chainable<any>;
      waitForRequestToFinish: (method: string, url: string, timeout?: number) => Chainable<any>;
      mockRequest: (method: string, url: string, response: any) => Chainable<any>;
      hasStatus: (response: any, status: number) => Chainable<any>;
      containsData: (response: any, key: string, value: any) => Chainable<any>;
      isArray: (response: any) => Chainable<any>;
      isObject: (response: any) => Chainable<any>;
      getResponseData: (response: any, key?: string) => Chainable<any>;
      requestWithHeaders: (method: string, url: string, data?: any, headers?: Record<string, string>) => Chainable<any>;
      requestWithToken: (method: string, url: string, token: string, data?: any) => Chainable<any>;
      requestAndWait: (method: string, url: string, data?: any, options?: any) => Chainable<any>;
      hasFailed: (response: any) => Chainable<any>;
      hasSucceeded: (response: any) => Chainable<any>;
      
      // Enhanced test data commands
      createTestData: (template: any, count?: number) => any[];
      createRandomEmail: () => string;
      createRandomString: (length?: number) => string;
      createRandomPhone: () => string;
      createRandomDate: (startYear?: number, endYear?: number) => Date;
      createUserData: (count?: number) => any;
      createAddressData: (count?: number) => any;
      createProductData: (count?: number) => any;
      createOrderData: (count?: number) => any;
      createRandomNumbers: (count: number, min?: number, max?: number) => number[];
      createRandomColor: () => string;
      createRandomBoolean: () => boolean;
      createDataWithValues: (values: any) => any;
      createDataWithOverrides: (baseTemplate: any, overrides: any) => boolean;
    }
  }
}

// Extend Cypress commands
export const extendCypressCommands = (): void => {
  // Navigation commands
  Cypress.Commands.add('visitAndWait', utils.visitAndWait);
  Cypress.Commands.add('visitAndWaitForIdle', utils.visitAndWaitForIdle);
  Cypress.Commands.add('reload', utils.reload);
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
  
  // Test data commands
  Cypress.Commands.add('generateTestData', utils.generateTestData);
  Cypress.Commands.add('generateUserData', utils.generateUserData);
  Cypress.Commands.add('generateAddressData', utils.generateAddressData);
  
  // Enhanced UI commands
  Cypress.Commands.add('dragTo', utils.dragTo);
  Cypress.Commands.add('scrollTo', utils.scrollTo);
  Cypress.Commands.add('clickAll', utils.clickAll);
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
  
  // Enhanced test data commands
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
}; 