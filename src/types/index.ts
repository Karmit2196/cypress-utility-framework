// Test data generation types
export interface TestDataTemplate {
  [key: string]: string | (() => string);
}

// Request options — thin alias over Cypress's own type so we don't re-declare conflicting shapes
export type RequestOptions = Partial<Cypress.RequestOptions>;

// Element wait options
export interface ElementWaitOptions {
  timeout?: number;
  retryInterval?: number;
  visible?: boolean;
  exist?: boolean;
}
// Network idle options
export interface NetworkIdleOptions {
  timeout?: number;
  minIdleTime?: number;
  maxPendingRequests?: number;
}

// Cypress Chainable type (for compatibility)
export type Chainable<T = unknown> = Cypress.Chainable<T>;

// ===== ENHANCED TYPES =====

// Storage types
export interface StorageOptions {
  domain?: string;
  path?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  expires?: Date | number;
}

export interface CookieOptions {
  domain?: string;
  path?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  expires?: Date | number;
  httpOnly?: boolean;
}

// Form data types
export interface FormData {
  [selector: string]: string | number | boolean;
}

export interface FormFieldOptions {
  clear?: boolean;
  delay?: number;
  force?: boolean;
}

// Test data configuration
export interface TestDataConfig {
  locale?: string;
  seed?: number;
  format?: 'json' | 'csv' | 'xml';
  count?: number;
}

// User data structure
export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
}

// Address data structure
export interface AddressData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Product data structure
export interface ProductData {
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  description: string;
}

// Order data structure
export interface OrderData {
  orderNumber: string;
  customerName: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  orderDate: Date;
}

// Element interaction types
export interface ElementOptions {
  timeout?: number;
  force?: boolean;
  multiple?: boolean;
  withinSubject?: JQuery<HTMLElement> | HTMLElement;
}

export interface ScrollOptions {
  duration?: number;
  easing?: 'swing' | 'linear';
  offset?: { top?: number; left?: number };
}

// Screenshot options
export interface ScreenshotOptions {
  name?: string;
  capture?: 'fullPage' | 'viewport' | 'runner';
  clip?: { x: number; y: number; width: number; height: number };
  disableTimersAndAnimations?: boolean;
}

// File upload options
export interface FileUploadOptions {
  force?: boolean;
  action?: 'select' | 'drag-drop';
}

// Keyboard key types
export type KeyboardKey =
  | 'enter'
  | 'tab'
  | 'space'
  | 'escape'
  | 'backspace'
  | 'delete'
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'home'
  | 'end'
  | 'pageup'
  | 'pagedown'
  | 'ctrl'
  | 'alt'
  | 'shift'
  | 'meta'
  | 'cmd'
  | 'command'
  | 'win'
  | 'windows';

// Mouse button types
export type MouseButton = 'left' | 'right' | 'middle';

// Viewport types
export interface ViewportSize {
  width: number;
  height: number;
}

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// Performance monitoring types
export interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
}

// Accessibility types
export interface AccessibilityOptions {
  include?: string[];
  exclude?: string[];
  rules?: Record<string, unknown>;
  tags?: string[];
}

// Assertion types
export interface AssertionOptions {
  timeout?: number;
  retryInterval?: number;
  message?: string;
}

// Configuration types
export interface CypressUtilsConfig {
  defaultTimeout: number;
  retryAttempts: number;
  screenshotOnFailure: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  baseUrl?: string;
  apiKey?: string;
  authToken?: string;
}

// Error types
export interface CypressUtilsError extends Error {
  code: string;
  context?: string;
  selector?: string;
  timeout?: number;
}

// Utility function return types
export type UtilityResult<T = unknown> = Chainable<T>;
export type AsyncUtilityResult<T = unknown> = Promise<T>;

// Generic data types
export type DataRecord = Record<string, unknown>;
export type DataArray = unknown[];
export type DataValue = string | number | boolean | null | undefined;

// API response types
export interface ApiResponse<T = unknown> {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: T;
  duration: number;
}

// Network request types
export interface NetworkRequest {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

// Wait condition types
export interface WaitCondition {
  condition: () => boolean | Promise<boolean>;
  timeout?: number;
  interval?: number;
  message?: string;
}

// Event types
export interface CustomEvent {
  type: string;
  detail?: unknown;
  bubbles?: boolean;
  cancelable?: boolean;
}

// Validation types
export interface ValidationRule {
  field: string;
  rule: 'required' | 'email' | 'phone' | 'url' | 'number' | 'min' | 'max' | 'pattern';
  value?: unknown;
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}
