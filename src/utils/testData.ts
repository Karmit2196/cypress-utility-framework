import { UserData, AddressData, ProductData, OrderData } from '../types';

// ===== TEST DATA UTILITIES =====

/**
 * Create test data based on a template
 */
export const createTestData = (
  template: Record<string, unknown>,
  count = 1
): Record<string, unknown> | Record<string, unknown>[] => {
  const data: Record<string, unknown>[] = [];

  for (let i = 0; i < count; i++) {
    const item: Record<string, unknown> = {};

    Object.entries(template).forEach(([key, value]) => {
      if (typeof value === 'function') {
        item[key] = (value as () => unknown)();
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
export const createUserData = (count = 1): UserData | UserData[] => {
  const template = {
    firstName: () => `User${Math.floor(Math.random() * 1000)}`,
    lastName: () => `Test${Math.floor(Math.random() * 1000)}`,
    email: createRandomEmail,
    phone: createRandomPhone,
    username: () => `user_${Math.floor(Math.random() * 10000)}`,
    password: () => `Pass${createRandomString(8)}!`,
  };

  return createTestData(template, count) as unknown as UserData | UserData[];
};

/**
 * Create address test data
 */
export const createAddressData = (count = 1): AddressData | AddressData[] => {
  const template = {
    street: () => `${Math.floor(Math.random() * 9999)} Test Street`,
    city: () => `Test City ${Math.floor(Math.random() * 100)}`,
    state: () => `TS${Math.floor(Math.random() * 100)}`,
    zipCode: () => `${Math.floor(Math.random() * 90000) + 10000}`,
    country: 'Test Country',
  };

  return createTestData(template, count) as unknown as AddressData | AddressData[];
};

/**
 * Create product test data
 */
export const createProductData = (count = 1): ProductData | ProductData[] => {
  const template = {
    name: () => `Product ${Math.floor(Math.random() * 1000)}`,
    price: () => Math.floor(Math.random() * 1000) + 10,
    category: () => ['Electronics', 'Clothing', 'Books', 'Home'][Math.floor(Math.random() * 4)],
    inStock: () => Math.random() > 0.5,
    description: () => `This is a test product ${Math.floor(Math.random() * 1000)}`,
  };

  return createTestData(template, count) as unknown as ProductData | ProductData[];
};

/**
 * Create order test data
 */
export const createOrderData = (count = 1): OrderData | OrderData[] => {
  const template = {
    orderNumber: () => `ORD-${Math.floor(Math.random() * 100000)}`,
    customerName: () => `Customer ${Math.floor(Math.random() * 1000)}`,
    total: () => Math.floor(Math.random() * 1000) + 10,
    status: () => ['Pending', 'Processing', 'Shipped', 'Delivered'][Math.floor(Math.random() * 4)],
    orderDate: createRandomDate,
  };

  return createTestData(template, count) as unknown as OrderData | OrderData[];
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
export const createDataWithValues = (values: Record<string, unknown>): Record<string, unknown> => {
  return { ...values };
};

/**
 * Create test data with overrides applied on top of a base template
 */
export const createDataWithOverrides = (
  baseTemplate: Record<string, unknown>,
  overrides: Record<string, unknown>
): Record<string, unknown> => {
  const baseData = createTestData(baseTemplate, 1) as Record<string, unknown>;
  return { ...baseData, ...overrides };
};
