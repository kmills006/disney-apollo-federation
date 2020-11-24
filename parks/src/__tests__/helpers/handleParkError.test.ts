import { handleParkError } from '../../helpers/handleParkError';

describe('helpers', () => {
  describe('handleParkError', () => {
    const systemUnderTest = handleParkError;
    const mockError = new Error('forced error');

    it('returns a IParkError with the error message', () => {
      const actual = systemUnderTest(mockError);

      expect(actual.message).toStrictEqual(mockError.message);
      expect(actual.cause).toStrictEqual(mockError);
    });

    it('returns a IParkError with a custom error message', () => {
      const message = 'custom message';
      const actual = systemUnderTest(mockError, message);

      expect(actual.message).toStrictEqual(message);
      expect(actual.cause).toStrictEqual(mockError);
    });
  });
});
