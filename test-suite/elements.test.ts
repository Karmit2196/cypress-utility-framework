import { describe, it, expect } from 'vitest';
import { mockCy } from './setup';
import {
  waitForElement,
  waitForElementExist,
  assertText,
  assertElementVisible,
  assertElementNotVisible,
  scrollToElement,
  waitForText,
  waitForNoText,
  waitForElementCount,
  waitForEmpty,
  waitForNotEmpty,
  isVisible,
  isHidden,
  isChecked,
  isUnchecked,
  isEnabled,
  isDisabled,
  isRequired,
  hasClass,
  hasAttribute,
  hasCSSProperty,
  containsText,
  clearAndType,
  typeSlowly,
} from '../src/utils/elements';

describe('waitForElement', () => {
  it('calls cy.get with selector and default timeout', () => {
    waitForElement('#foo');
    expect(mockCy.get).toHaveBeenCalledWith('#foo', { timeout: 10000 });
  });

  it('respects a custom timeout', () => {
    waitForElement('#foo', 3000);
    expect(mockCy.get).toHaveBeenCalledWith('#foo', { timeout: 3000 });
  });
});

describe('waitForElementExist', () => {
  it('calls cy.get with selector and timeout', () => {
    waitForElementExist('.bar');
    expect(mockCy.get).toHaveBeenCalledWith('.bar', { timeout: 10000 });
  });
});

describe('assertText', () => {
  it('calls cy.get with the correct selector', () => {
    assertText('h1', 'Hello');
    expect(mockCy.get).toHaveBeenCalledWith('h1');
  });
});

describe('assertElementVisible', () => {
  it('calls cy.get', () => {
    assertElementVisible('.btn');
    expect(mockCy.get).toHaveBeenCalledWith('.btn');
  });
});

describe('assertElementNotVisible', () => {
  it('calls cy.get', () => {
    assertElementNotVisible('.hidden');
    expect(mockCy.get).toHaveBeenCalledWith('.hidden');
  });
});

describe('scrollToElement', () => {
  it('calls cy.get with the selector', () => {
    scrollToElement('#anchor');
    expect(mockCy.get).toHaveBeenCalledWith('#anchor');
  });
});

describe('text wait helpers', () => {
  it('waitForText calls cy.get with timeout', () => {
    waitForText('.msg', 'done');
    expect(mockCy.get).toHaveBeenCalledWith('.msg', { timeout: 10000 });
  });

  it('waitForNoText calls cy.get with timeout', () => {
    waitForNoText('.msg', 'loading');
    expect(mockCy.get).toHaveBeenCalledWith('.msg', { timeout: 10000 });
  });
});

describe('waitForElementCount', () => {
  it('calls cy.get with selector and timeout', () => {
    waitForElementCount('li', 5);
    expect(mockCy.get).toHaveBeenCalledWith('li', { timeout: 10000 });
  });
});

describe('waitForEmpty / waitForNotEmpty', () => {
  it('waitForEmpty calls cy.get', () => {
    waitForEmpty('input');
    expect(mockCy.get).toHaveBeenCalledWith('input', { timeout: 10000 });
  });

  it('waitForNotEmpty calls cy.get', () => {
    waitForNotEmpty('input');
    expect(mockCy.get).toHaveBeenCalledWith('input', { timeout: 10000 });
  });
});

describe('state assertion helpers', () => {
  it.each([
    ['isVisible', isVisible],
    ['isHidden', isHidden],
    ['isChecked', isChecked],
    ['isUnchecked', isUnchecked],
    ['isEnabled', isEnabled],
    ['isDisabled', isDisabled],
    ['isRequired', isRequired],
    ['containsText (1 arg selector)', (sel: string) => containsText(sel, 'x')],
  ] as [string, (sel: string) => unknown][])('%s calls cy.get with the selector', (_name, fn) => {
    fn('#el');
    expect(mockCy.get).toHaveBeenCalledWith('#el');
    mockCy.get.mockClear();
  });
});

describe('hasClass / hasAttribute / hasCSSProperty', () => {
  it('hasClass calls cy.get', () => {
    hasClass('.btn', 'active');
    expect(mockCy.get).toHaveBeenCalledWith('.btn');
  });

  it('hasAttribute calls cy.get', () => {
    hasAttribute('input', 'disabled');
    expect(mockCy.get).toHaveBeenCalledWith('input');
  });

  it('hasCSSProperty calls cy.get', () => {
    hasCSSProperty('.box', 'color', 'red');
    expect(mockCy.get).toHaveBeenCalledWith('.box');
  });
});

describe('typing helpers', () => {
  it('clearAndType calls cy.get with the selector', () => {
    clearAndType('input', 'hello');
    expect(mockCy.get).toHaveBeenCalledWith('input');
  });

  it('typeSlowly calls cy.get with the selector', () => {
    typeSlowly('input', 'slow', 50);
    expect(mockCy.get).toHaveBeenCalledWith('input');
  });
});
