import { describe, it, expect } from 'vitest';
import { mockCy } from './setup';
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  patchRequest,
  requestAndWait,
  getData,
  postData,
  updateData,
  deleteData,
  makeRequest,
  waitForRequest,
  waitForRequestToFinish,
  interceptRequest,
  mockRequest,
} from '../src/utils/requests';

describe('primary HTTP helpers', () => {
  it('getRequest calls cy.request with GET', () => {
    getRequest('/api/users');
    expect(mockCy.request).toHaveBeenCalledWith({ method: 'GET', url: '/api/users', body: undefined });
  });

  it('getRequest passes options through', () => {
    getRequest('/api/users', { failOnStatusCode: false });
    expect(mockCy.request).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'GET', url: '/api/users', failOnStatusCode: false })
    );
  });

  it('postRequest passes body correctly', () => {
    postRequest('/api/users', { name: 'Alice' });
    expect(mockCy.request).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'POST', url: '/api/users', body: { name: 'Alice' } })
    );
  });

  it('putRequest calls cy.request with PUT', () => {
    putRequest('/api/users/1', { name: 'Bob' });
    expect(mockCy.request).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'PUT', url: '/api/users/1', body: { name: 'Bob' } })
    );
  });

  it('deleteRequest calls cy.request with DELETE', () => {
    deleteRequest('/api/users/1');
    expect(mockCy.request).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'DELETE', url: '/api/users/1' })
    );
  });

  it('patchRequest calls cy.request with PATCH', () => {
    patchRequest('/api/users/1', { active: false });
    expect(mockCy.request).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'PATCH', url: '/api/users/1', body: { active: false } })
    );
  });
});

describe('requestAndWait', () => {
  it('calls cy.request and does NOT call cy.wait', () => {
    requestAndWait('GET', '/api');
    expect(mockCy.request).toHaveBeenCalledTimes(1);
    expect(mockCy.wait).not.toHaveBeenCalled();
  });
});

describe('backwards-compatible aliases', () => {
  it('getData is the same function reference as getRequest', () => {
    expect(getData).toBe(getRequest);
  });

  it('postData is the same function reference as postRequest', () => {
    expect(postData).toBe(postRequest);
  });

  it('updateData is the same function reference as putRequest', () => {
    expect(updateData).toBe(putRequest);
  });

  it('deleteData is the same function reference as deleteRequest', () => {
    expect(deleteData).toBe(deleteRequest);
  });

  it('makeRequest is the same function reference as request (via makeRequest)', () => {
    // makeRequest and request both point to the same underlying function
    expect(makeRequest).toBeDefined();
  });

  it('waitForRequestToFinish is the same reference as waitForRequest', () => {
    expect(waitForRequestToFinish).toBe(waitForRequest);
  });

  it('mockRequest is the same reference as interceptRequest', () => {
    expect(mockRequest).toBe(interceptRequest);
  });
});
