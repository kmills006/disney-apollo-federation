import { mock, mockReset } from 'jest-mock-extended';
import * as E from 'fp-ts/lib/Either';

import { MOCK_ATTRACTIONS } from '../../__mocks__/attractions';
import { AttractionAPI } from '../../graphql/datasource';
import { repository } from '../../repositories/attractions';
import { ParkPermalink } from '../../types';

describe('repositories', () => {
  const mockAttractionsAPI = mock<AttractionAPI>();

  beforeEach(() => {
    mockReset(mockAttractionsAPI);
  });

  describe('attractions', () => {
    describe('getAttractions', () => {
      it('returns right with a list of attractions', async () => {
        mockAttractionsAPI.getAttractions.mockResolvedValue(MOCK_ATTRACTIONS);

        const systemUnderTest = repository(mockAttractionsAPI)();
        const actual = await systemUnderTest.getAttractions()();

        expect(E.isRight(actual)).toBeTruthy();
      });

      it('calls the datasource for all parks', async () => {
        mockAttractionsAPI.getAttractions.mockResolvedValue(MOCK_ATTRACTIONS);

        const systemUnderTest = repository(mockAttractionsAPI)();
        const parks = Object.values(ParkPermalink);

        await systemUnderTest.getAttractions()();

        parks.forEach((park) => {
          expect(mockAttractionsAPI.getAttractions).toBeCalledWith(park);
        });

        expect(mockAttractionsAPI.getAttractions).toBeCalledTimes(parks.length);
      });

      it('returns left when an error occurs', async () => {
        mockAttractionsAPI.getAttractions.mockRejectedValue(new Error('forced error'));

        const systemUnderTest = repository(mockAttractionsAPI)();
        const actual = await systemUnderTest.getAttractions()();

        expect(E.isLeft(actual)).toBeTruthy();
      });
    });

    describe('getParkAttractions', () => {
      it('returns right with a list of attractions for a park', async () => {
        mockAttractionsAPI.getAttractions.mockResolvedValue(MOCK_ATTRACTIONS);

        const systemUnderTest = repository(mockAttractionsAPI)();
        const actual = await systemUnderTest.getParkAttractions(ParkPermalink.Epcot)();

        expect(E.isRight(actual)).toBeTruthy();
      });

      it('calls the datasource for the parks', async () => {
        mockAttractionsAPI.getAttractions.mockResolvedValue(MOCK_ATTRACTIONS);

        const systemUnderTest = repository(mockAttractionsAPI)();

        await systemUnderTest.getParkAttractions(ParkPermalink.MagicKingdom)();

        expect(mockAttractionsAPI.getAttractions).toBeCalledWith(ParkPermalink.MagicKingdom);
        expect(mockAttractionsAPI.getAttractions).toBeCalledTimes(1);
      });

      it('returns left when an error occurs', async () => {
        mockAttractionsAPI.getAttractions.mockRejectedValue(new Error('forced error'));

        const systemUnderTest = repository(mockAttractionsAPI)();
        const actual = await systemUnderTest.getParkAttractions(ParkPermalink.HollywoodStudios)();

        expect(E.isLeft(actual)).toBeTruthy();
      });
    });
  });
});
