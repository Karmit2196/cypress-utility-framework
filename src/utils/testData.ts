import { TestDataTemplate } from '../types';

// ===== BASIC TEST DATA UTILITIES =====

/**
 * Generate test data based on a template
 */
export const generateTestData = (template: TestDataTemplate, count = 1): any[] => {
  const data: any[] = [];
  
  for (let i = 0; i < count; i++) {
    const item: any = {};
    
    Object.entries(template).forEach(([key, value]) => {
      if (typeof value === 'function') {
        item[key] = value();
      } else {
        item[key] = value;
      }
    });
    
    data.push(item);
  }
  
  return count === 1 ? data[0] : data;
};

/**
 * Generate random email
 */
export const generateRandomEmail = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `test.${timestamp}.${random}@example.com`;
};

/**
 * Generate random string
 */
export const generateRandomString = (length = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

/**
 * Generate random phone number
 */
export const generateRandomPhone = (): string => {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNumber = Math.floor(Math.random() * 9000) + 1000;
  
  return `${areaCode}-${prefix}-${lineNumber}`;
};

/**
 * Generate random date within a range
 */
export const generateRandomDate = (startDate = new Date(2020, 0, 1), endDate = new Date()): Date => {
  const start = startDate.getTime();
  const end = endDate.getTime();
  const randomTime = start + Math.random() * (end - start);
  
  return new Date(randomTime);
};

/**
 * Generate user test data
 */
export const generateUserData = (count = 1): any => {
  const template: TestDataTemplate = {
    firstName: () => `User${Math.floor(Math.random() * 1000)}`,
    lastName: () => `Test${Math.floor(Math.random() * 1000)}`,
    email: generateRandomEmail,
    phone: generateRandomPhone,
    username: () => `user_${Math.floor(Math.random() * 10000)}`,
    password: () => `Pass${generateRandomString(8)}!`,
  };
  
  return generateTestData(template, count);
};

/**
 * Generate address test data
 */
export const generateAddressData = (count = 1): any => {
  const template: TestDataTemplate = {
    street: () => `${Math.floor(Math.random() * 9999)} Test Street`,
    city: () => `Test City ${Math.floor(Math.random() * 100)}`,
    state: () => `TS${Math.floor(Math.random() * 100)}`,
    zipCode: () => `${Math.floor(Math.random() * 90000) + 10000}`,
    country: 'Test Country',
  };
  
  return generateTestData(template, count);
};

// ===== ENHANCED TEST DATA UTILITIES =====

/**
 * Create test data based on a template
 */
export const createTestData = (template: Record<string, any>, count = 1): any[] => {
  const data: any[] = [];
  
  for (let i = 0; i < count; i++) {
    const item: any = {};
    
    Object.entries(template).forEach(([key, value]) => {
      if (typeof value === 'function') {
        item[key] = value();
      } else {
        item[key] = value;
      }
    });
    
    data.push(item);
  }
  
  return count === 1 ? data[0] : data;
};

/**
 * Create a random email address
 */
export const createRandomEmail = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `test.${timestamp}.${random}@example.com`;
};

/**
 * Create a random string
 */
export const createRandomString = (length = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

/**
 * Create a random phone number
 */
export const createRandomPhone = (): string => {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNumber = Math.floor(Math.random() * 9000) + 1000;
  
  return `${areaCode}-${prefix}-${lineNumber}`;
};

/**
 * Create a random date
 */
export const createRandomDate = (startYear = 2020, endYear = 2024): Date => {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  const randomTime = start + Math.random() * (end - start);
  
  return new Date(randomTime);
};

/**
 * Create user test data
 */
export const createUserData = (count = 1): any => {
  const template = {
    firstName: () => `User${Math.floor(Math.random() * 1000)}`,
    lastName: () => `Test${Math.floor(Math.random() * 1000)}`,
    email: createRandomEmail,
    phone: createRandomPhone,
    username: () => `user_${Math.floor(Math.random() * 10000)}`,
    password: () => `Pass${createRandomString(8)}!`,
  };
  
  return createTestData(template, count);
};

/**
 * Create address test data
 */
export const createAddressData = (count = 1): any => {
  const template = {
    street: () => `${Math.floor(Math.random() * 9999)} Test Street`,
    city: () => `Test City ${Math.floor(Math.random() * 100)}`,
    state: () => `TS${Math.floor(Math.random() * 100)}`,
    zipCode: () => `${Math.floor(Math.random() * 90000) + 10000}`,
    country: 'Test Country',
  };
  
  return createTestData(template, count);
};

/**
 * Create product test data
 */
export const createProductData = (count = 1): any => {
  const template = {
    name: () => `Product ${Math.floor(Math.random() * 1000)}`,
    price: () => Math.floor(Math.random() * 1000) + 10,
    category: () => ['Electronics', 'Clothing', 'Books', 'Home'][Math.floor(Math.random() * 4)],
    inStock: () => Math.random() > 0.5,
    description: () => `This is a test product ${Math.floor(Math.random() * 1000)}`,
  };
  
  return createTestData(template, count);
};

/**
 * Create order test data
 */
export const createOrderData = (count = 1): any => {
  const template = {
    orderNumber: () => `ORD-${Math.floor(Math.random() * 100000)}`,
    customerName: () => `Customer ${Math.floor(Math.random() * 1000)}`,
    total: () => Math.floor(Math.random() * 1000) + 10,
    status: () => ['Pending', 'Processing', 'Shipped', 'Delivered'][Math.floor(Math.random() * 4)],
    orderDate: createRandomDate,
  };
  
  return createTestData(template, count);
};

/**
 * Create a list of random numbers
 */
export const createRandomNumbers = (count: number, min = 1, max = 100): number[] => {
  const numbers: number[] = [];
  
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  
  return numbers;
};

/**
 * Create a random color
 */
export const createRandomColor = (): string => {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown'];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Create a random boolean
 */
export const createRandomBoolean = (): boolean => {
  return Math.random() > 0.5;
};

/**
 * Create test data with specific values
 */
export const createDataWithValues = (values: Record<string, any>): any => {
  return { ...values };
};

/**
 * Create test data with overrides
 */
export const createDataWithOverrides = (
  baseTemplate: Record<string, any>,
  overrides: Record<string, any>
): any => {
  const baseData = createTestData(baseTemplate, 1);
  return { ...baseData, ...overrides };
}; 