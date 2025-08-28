// Test data generation types
export interface TestDataTemplate {
  [key: string]: string | (() => string);
}

// Request options interface
export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  failOnStatusCode?: boolean;
  log?: boolean;
}

// Element wait options
export interface ElementWaitOptions {
  timeout?: number;
  retryInterval?: number;
  visible?: boolean;
  exist?: boolean;
} 