// import { mockDeep } from 'jest-mock-extended';
import crypto from 'crypto';
import { GraphQLResolveInfo } from 'graphql';
import { mockDeep } from 'jest-mock-extended';

import { createOperationHash, logResolverTime } from '../middleware';

describe('middleware', () => {
  describe('createOperationHash', () => {
    it('calls randomBytes with a defined size', () => {
      const cryptoSpy = jest.spyOn(crypto, 'randomBytes');
      const size = 10;

      createOperationHash(size);

      expect(cryptoSpy).toBeCalledWith(size);
    });

    it('calls randomBytes with the default size', () => {
      const cryptoSpy = jest.spyOn(crypto, 'randomBytes');

      createOperationHash();

      expect(cryptoSpy).toBeCalledWith(6);
    });
  });

  describe('logResolverTime', () => {
    it('logs the resolver performance time', async () => {
      const consoleTimeSpy = spyOn(console, 'time');
      const consoleTimeEndSpy = spyOn(console, 'timeEnd');

      await logResolverTime(jest.fn(), {}, {}, {}, mockDeep<GraphQLResolveInfo>());

      expect(consoleTimeSpy).toBeCalledTimes(1);
      expect(consoleTimeEndSpy).toBeCalledTimes(1);
    });
  });
});
