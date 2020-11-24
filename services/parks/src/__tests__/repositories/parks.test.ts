import * as O from 'fp-ts/lib/Option';

import { MOCK_PARKS } from '../../__mocks__/mockParks';
import { repository } from '../../repositories/parks';

describe('respositories', () => {
  describe('parks', () => {
    describe('getParks', () => {
      it('returns a list of parks', () => {
        const systemUnderTest = repository(MOCK_PARKS)();
        const actual = systemUnderTest.getParks();

        expect(actual).toStrictEqual(MOCK_PARKS);
      });
    });

    describe('getParkByPermalink', () => {
      const mockPark = MOCK_PARKS[Math.floor(Math.random() * MOCK_PARKS.length)];

      it('returns right with a park by its permalink', () => {
        const systemUnderTest = repository(MOCK_PARKS)();
        const actual = systemUnderTest.getParkByPermalink(mockPark.permalink);

        expect(O.isSome(actual)).toBeTruthy();
      });

      it('returns left when permalink doesnt match a park', () => {
        const systemUnderTest = repository(MOCK_PARKS)();
        const actual = systemUnderTest.getParkByPermalink('test-permalink');

        expect(O.isSome(actual)).toBeFalsy();
      });
    });
  });
});
