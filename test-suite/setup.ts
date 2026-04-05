import { vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Minimal chainable mock — .then(cb) calls cb synchronously with the wrapped
// value so every test stays synchronous without async/await.
// ---------------------------------------------------------------------------
type ChainLike = Record<string, unknown>;

function createChain(value: unknown = null): ChainLike {
  const chain: ChainLike = {
    then: vi.fn((cb: (v: unknown) => unknown) => createChain(cb(value))),
    should: vi.fn().mockReturnThis(),
    click: vi.fn().mockReturnThis(),
    type: vi.fn().mockReturnThis(),
    clear: vi.fn().mockReturnThis(),
    scrollIntoView: vi.fn().mockReturnThis(),
    trigger: vi.fn().mockReturnThis(),
    focus: vi.fn().mockReturnThis(),
    blur: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    selectFile: vi.fn().mockReturnThis(),
    rightclick: vi.fn().mockReturnThis(),
    dblclick: vi.fn().mockReturnThis(),
    get: vi.fn().mockReturnThis(),
  };
  return chain;
}

// ---------------------------------------------------------------------------
// Fake window with in-memory localStorage and sessionStorage spies
// ---------------------------------------------------------------------------
const store: Record<string, string> = {};

export const fakeWin = {
  localStorage: {
    setItem: vi.fn((k: string, v: string) => { store[k] = v; }),
    getItem: vi.fn((k: string) => store[k] ?? null),
    removeItem: vi.fn((k: string) => { delete store[k]; }),
    clear: vi.fn(() => { Object.keys(store).forEach(k => delete store[k]); }),
    key: vi.fn((i: number) => Object.keys(store)[i] ?? null),
    get length() { return Object.keys(store).length; },
  },
  sessionStorage: {
    setItem: vi.fn(),
    getItem: vi.fn(() => null),
    removeItem: vi.fn(),
    clear: vi.fn(),
    get length() { return 0; },
  },
  document: { readyState: 'complete' },
  addEventListener: vi.fn(),
};

// ---------------------------------------------------------------------------
// Mock cy object
// ---------------------------------------------------------------------------
export const mockCy = {
  request: vi.fn((opts: unknown) =>
    createChain({ status: 200, body: {}, ...(opts as object) })
  ),
  get: vi.fn(() => createChain()),
  wrap: vi.fn((v: unknown) => createChain(v)),
  wait: vi.fn(() => createChain()),
  intercept: vi.fn(() => createChain()),
  window: vi.fn(() => createChain(fakeWin)),
  clearLocalStorage: vi.fn(() => createChain([])),
  screenshot: vi.fn(() => createChain(null)),
  visit: vi.fn(() => createChain()),
  go: vi.fn(() => createChain()),
  reload: vi.fn(() => createChain()),
};

// ---------------------------------------------------------------------------
// Install globals before each test, reset call counts
// ---------------------------------------------------------------------------
beforeEach(() => {
  for (const fn of Object.values(mockCy)) {
    (fn as ReturnType<typeof vi.fn>).mockClear();
  }
  fakeWin.localStorage.setItem.mockClear();
  fakeWin.localStorage.getItem.mockClear();
  fakeWin.localStorage.removeItem.mockClear();
  fakeWin.localStorage.clear.mockClear();
  fakeWin.sessionStorage.setItem.mockClear();
  fakeWin.sessionStorage.getItem.mockClear();
  fakeWin.sessionStorage.removeItem.mockClear();
  fakeWin.sessionStorage.clear.mockClear();
  Object.keys(store).forEach(k => delete store[k]);

  globalThis.cy = mockCy as unknown as typeof cy;
  globalThis.Cypress = {
    Commands: { add: vi.fn() },
    Promise: Promise,
  } as unknown as typeof Cypress;
});
