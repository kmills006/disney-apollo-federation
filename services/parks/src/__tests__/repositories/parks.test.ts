import * as O from 'fp-ts/lib/Option';

import { MOCK_PARKS } from '../../__mocks__';
import { ParkId } from '../../models/Park';
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
      it('returns right with a park by its permalink', () => {
        const systemUnderTest = repository(MOCK_PARKS)();
        const actual = systemUnderTest.getParkByPermalink(ParkId.MAGIC_KINGDOM);

        expect(O.isSome(actual)).toBeTruthy();
      });

      it('returns left when permalink doesnt match a park', () => {
        const systemUnderTest = repository(MOCK_PARKS)();
        const actual = systemUnderTest.getParkByPermalink(ParkId.MAGIC_KINGDOM);

        expect(O.isSome(actual)).toBeFalsy();
      });
    });
  });
});
