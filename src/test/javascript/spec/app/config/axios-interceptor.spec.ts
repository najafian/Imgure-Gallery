import axios from 'axios';
import sinon from 'sinon';

import setupAxiosInterceptors from 'app/config/axios-interceptor';

describe('Axios Interceptor', () => {
  describe('setupAxiosInterceptors', () => {
    const client = axios;
    const onUnauthenticated = sinon.spy();
    setupAxiosInterceptors(onUnauthenticated);
    it('onResponseSuccess is called on fulfilled response', () => {
      expect((client.interceptors.response as any).handlers[0].fulfilled({data: 'imgur'})).toEqual({data: 'imgur'});
    });
    it('onResponseError is called on rejected response', () => {
      (client.interceptors.response as any).handlers[0].rejected({
        response: {
          statusText: 'NotFound',
          status: 403,
          data: {message: 'Page not found'}
        }
      });
      expect(onUnauthenticated.calledOnce).toBe(false);
    });
  });
});
