import { describe, it, expect } from 'vitest';
import {
  createUserData,
  createAddressData,
  createProductData,
  createOrderData,
  createRandomEmail,
  createRandomString,
  createRandomPhone,
  createRandomDate,
  createRandomNumbers,
  createRandomBoolean,
  createRandomColor,
  createTestData,
  createDataWithValues,
  createDataWithOverrides,
} from '../src/utils/testData';
import type { UserData, AddressData, ProductData, OrderData } from '../src/types';

// Pure-function tests — no cy mock involved

describe('createRandomEmail', () => {
  it('returns a string matching the expected pattern', () => {
    const email = createRandomEmail();
    expect(email).toMatch(/^test\.\d+\.[a-z0-9]+@example\.com$/);
  });

  it('returns a different value each call', () => {
    expect(createRandomEmail()).not.toBe(createRandomEmail());
  });
});

describe('createRandomString', () => {
  it('returns a string of the default length (8)', () => {
    expect(createRandomString()).toHaveLength(8);
  });

  it('returns a string of the specified length', () => {
    expect(createRandomString(16)).toHaveLength(16);
  });

  it('only contains alphanumeric characters', () => {
    expect(createRandomString(50)).toMatch(/^[A-Za-z0-9]+$/);
  });
});

describe('createRandomPhone', () => {
  it('matches NNN-NNN-NNNN format', () => {
    expect(createRandomPhone()).toMatch(/^\d{3}-\d{3}-\d{4}$/);
  });
});

describe('createRandomDate', () => {
  it('returns a Date instance', () => {
    expect(createRandomDate()).toBeInstanceOf(Date);
  });

  it('falls within the specified year range', () => {
    const d = createRandomDate(2022, 2023);
    expect(d.getFullYear()).toBeGreaterThanOrEqual(2022);
    expect(d.getFullYear()).toBeLessThanOrEqual(2023);
  });
});

describe('createRandomNumbers', () => {
  it('returns an array of the requested length', () => {
    expect(createRandomNumbers(5)).toHaveLength(5);
  });

  it('all values fall within [min, max]', () => {
    createRandomNumbers(20, 10, 50).forEach(n => {
      expect(n).toBeGreaterThanOrEqual(10);
      expect(n).toBeLessThanOrEqual(50);
    });
  });
});

describe('createRandomBoolean', () => {
  it('returns a boolean', () => {
    expect(typeof createRandomBoolean()).toBe('boolean');
  });
});

describe('createRandomColor', () => {
  it('returns a non-empty string', () => {
    expect(typeof createRandomColor()).toBe('string');
    expect(createRandomColor().length).toBeGreaterThan(0);
  });
});

describe('createUserData', () => {
  it('returns a single UserData object with all required fields', () => {
    const user = createUserData() as UserData;
    expect(user).toHaveProperty('firstName');
    expect(user).toHaveProperty('lastName');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('phone');
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('password');
  });

  it('email field passes email regex', () => {
    const { email } = createUserData() as UserData;
    expect(email).toMatch(/@/);
  });

  it('returns an array when count > 1', () => {
    const users = createUserData(3) as UserData[];
    expect(Array.isArray(users)).toBe(true);
    expect(users).toHaveLength(3);
  });
});

describe('createAddressData', () => {
  it('returns an object with all required fields', () => {
    const addr = createAddressData() as AddressData;
    expect(addr).toHaveProperty('street');
    expect(addr).toHaveProperty('city');
    expect(addr).toHaveProperty('state');
    expect(addr).toHaveProperty('zipCode');
    expect(addr).toHaveProperty('country');
  });
});

describe('createProductData', () => {
  it('returns an object with all required fields', () => {
    const prod = createProductData() as ProductData;
    expect(prod).toHaveProperty('name');
    expect(prod).toHaveProperty('price');
    expect(prod).toHaveProperty('category');
    expect(prod).toHaveProperty('inStock');
    expect(prod).toHaveProperty('description');
  });
});

describe('createOrderData', () => {
  it('returns an object with all required fields', () => {
    const order = createOrderData() as OrderData;
    expect(order).toHaveProperty('orderNumber');
    expect(order).toHaveProperty('customerName');
    expect(order).toHaveProperty('total');
    expect(order).toHaveProperty('status');
    expect(order).toHaveProperty('orderDate');
  });
});

describe('createTestData', () => {
  it('evaluates function values in the template', () => {
    const result = createTestData({ name: () => 'Alice', age: 30 }) as Record<string, unknown>;
    expect(result.name).toBe('Alice');
    expect(result.age).toBe(30);
  });

  it('returns an array when count > 1', () => {
    const result = createTestData({ x: 1 }, 3) as Record<string, unknown>[];
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(3);
  });
});

describe('createDataWithValues', () => {
  it('returns an object containing the supplied values', () => {
    const result = createDataWithValues({ a: 1, b: 'two' });
    expect(result).toEqual({ a: 1, b: 'two' });
  });
});

describe('createDataWithOverrides', () => {
  it('applies overrides on top of the base template', () => {
    const result = createDataWithOverrides({ role: 'user' }, { role: 'admin' });
    expect(result.role).toBe('admin');
  });
});
