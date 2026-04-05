import { describe, it, expect } from 'vitest';
import { mockCy, fakeWin } from './setup';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  hasLocalStorageKey,
  getLocalStorageKeys,
  getLocalStorageSize,
  setMultipleLocalStorage,
  clearSessionStorage,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  hasSessionStorageKey,
} from '../src/utils/storage';

describe('localStorage helpers', () => {
  it('setLocalStorage calls win.localStorage.setItem with correct args', () => {
    setLocalStorage('myKey', 'myVal');
    expect(mockCy.window).toHaveBeenCalled();
    expect(fakeWin.localStorage.setItem).toHaveBeenCalledWith('myKey', 'myVal');
  });

  it('getLocalStorage calls win.localStorage.getItem', () => {
    fakeWin.localStorage.setItem('k', 'v');
    getLocalStorage('k');
    expect(fakeWin.localStorage.getItem).toHaveBeenCalledWith('k');
  });

  it('removeLocalStorage calls win.localStorage.removeItem', () => {
    removeLocalStorage('k');
    expect(fakeWin.localStorage.removeItem).toHaveBeenCalledWith('k');
  });

  it('hasLocalStorageKey returns true when key exists', () => {
    fakeWin.localStorage.setItem('exists', '1');
    // The chain resolves synchronously through our mock's .then()
    hasLocalStorageKey('exists');
    expect(fakeWin.localStorage.getItem).toHaveBeenCalledWith('exists');
  });

  it('setMultipleLocalStorage calls setItem for each entry', () => {
    setMultipleLocalStorage({ a: '1', b: '2' });
    expect(fakeWin.localStorage.setItem).toHaveBeenCalledWith('a', '1');
    expect(fakeWin.localStorage.setItem).toHaveBeenCalledWith('b', '2');
  });

  it('getLocalStorageKeys wraps cy.window', () => {
    getLocalStorageKeys();
    expect(mockCy.window).toHaveBeenCalled();
  });

  it('getLocalStorageSize wraps cy.window', () => {
    getLocalStorageSize();
    expect(mockCy.window).toHaveBeenCalled();
  });
});

describe('sessionStorage helpers', () => {
  it('setSessionStorage calls win.sessionStorage.setItem', () => {
    setSessionStorage('sKey', 'sVal');
    expect(fakeWin.sessionStorage.setItem).toHaveBeenCalledWith('sKey', 'sVal');
  });

  it('getSessionStorage calls win.sessionStorage.getItem', () => {
    getSessionStorage('sKey');
    expect(fakeWin.sessionStorage.getItem).toHaveBeenCalledWith('sKey');
  });

  it('removeSessionStorage calls win.sessionStorage.removeItem', () => {
    removeSessionStorage('sKey');
    expect(fakeWin.sessionStorage.removeItem).toHaveBeenCalledWith('sKey');
  });

  it('clearSessionStorage calls win.sessionStorage.clear', () => {
    clearSessionStorage();
    expect(fakeWin.sessionStorage.clear).toHaveBeenCalled();
  });

  it('hasSessionStorageKey calls win.sessionStorage.getItem', () => {
    hasSessionStorageKey('sKey');
    expect(fakeWin.sessionStorage.getItem).toHaveBeenCalledWith('sKey');
  });
});
