import { ApolloServer, gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import * as O from 'fp-ts/lib/Option';
import { mockDeep } from 'jest-mock-extended';

import { MOCK_PARKS } from '../../__mocks__/mockParks';
import { resolvers } from '../../graphql/resolvers';
import { typeDefs } from '../../graphql/typeDefs';
import { constructApolloServer } from '../../graphql';
import { IParkRepository } from '../../repositories/parks';

describe('graphql', () => {
  describe('server', () => {
    const mockParksRepository = mockDeep<IParkRepository>();

    let server: ApolloServer;

    beforeEach(() => {
      server = constructApolloServer({
        resolvers,
        typeDefs,
        context: () => ({
          repositories: { parks: mockParksRepository },
        }),
      });
    });

    describe('queries', () => {
      describe('parks', () => {
        const GET_PARKS = gql`query { parks { name permalink } }`;

        it('returns a list of parks', async () => {
          mockParksRepository.getParks.mockReturnValueOnce(MOCK_PARKS);

          const { query } = createTestClient(server);
          const actual = await query({ query: GET_PARKS });

          expect(actual).toMatchSnapshot();
        });
      });

      describe('park', () => {
        const GET_PARK = gql`
          query Park($permalink: String!) {
            park(permalink: $permalink) {
              ... on Park { name permalink }
              ... on NoParkFoundError { message permalink }
            }
          }
        `;

        const mockPark = MOCK_PARKS[0];

        it('returns a park by its permalink', async () => {
          mockParksRepository.getParkByPermalink.mockReturnValueOnce(O.some(mockPark));

          const { query } = createTestClient(server);
          const actual = await query({
            query: GET_PARK,
            variables: { permalink: mockPark.permalink },
          });

          expect(actual).toMatchSnapshot();
        });

        it('returns a NoParkFoundError', async () => {
          mockParksRepository.getParkByPermalink.mockReturnValueOnce(O.none);

          const { query } = createTestClient(server);
          const actual = await query({
            query: GET_PARK,
            variables: { permalink: mockPark.permalink },
          });

          expect(actual).toMatchSnapshot();
        });
      });
    });
  });
});