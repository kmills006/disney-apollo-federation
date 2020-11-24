import { MOCK_PARKS } from '../../__mocks__/mockParks';
import { repository } from '../../repositories/parks';

describe('respositories', () => {
  describe('parks', () => {
    describe('getParks', () => {
      it('returns right with a list of parks', () => {
        const systemUnderTest = repository(MOCK_PARKS)();
        const actual = systemUnderTest.getParks();

        expect(actual).toStrictEqual(MOCK_PARKS);
      });
    });
  });
});
