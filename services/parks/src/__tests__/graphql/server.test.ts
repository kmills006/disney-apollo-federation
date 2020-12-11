import { buildFederatedSchema } from '@apollo/federation';
import { constructApolloServer } from '@disney-federation/gql-utils';
import { ApolloServer, gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import * as O from 'fp-ts/lib/Option';
import { mockDeep } from 'jest-mock-extended';

import { MOCK_PARKS } from '../../__mocks__';
import { resolvers } from '../../graphql/resolvers';
import { typeDefs } from '../../graphql/typeDefs';
import { IParkRepository } from '../../repositories/parks';

describe.only('graphql', () => {
  describe('server', () => {
    const mockParksRepository = mockDeep<IParkRepository>();

    let server: ApolloServer;

    beforeEach(() => {
      server = constructApolloServer({
        schema: buildFederatedSchema({ resolvers, typeDefs }),
        context: () => ({
          repositories: { parks: mockParksRepository },
        }),
      });
    });

    describe('queries', () => {
      describe('parks', () => {
        const GET_PARKS = gql`query { parks { id name permalink } }`;

        it.only('returns a list of parks', async () => {
          mockParksRepository.getParks.mockReturnValueOnce(MOCK_PARKS);

          const { query } = createTestClient(server);
          const actual = await query({ query: GET_PARKS });

          expect(actual).toMatchSnapshot();
        });
      });

      describe('park', () => {
        const GET_PARK = gql`
          query Park($id: ParkId!) {
            park(id: $id) {
              ... on Park { id name permalink }
              ... on NoParkFoundError { message }
            }
          }
        `;

        const mockPark = MOCK_PARKS[0];

        it('returns a park by its id', async () => {
          mockParksRepository.getParkByPermalink.mockReturnValueOnce(O.some(mockPark));

          const { query } = createTestClient(server);
          const actual = await query({
            query: GET_PARK,
            variables: { id: 'EPCOT' },
          });

          expect(actual).toMatchSnapshot();
        });

        it('returns a NoParkFoundError', async () => {
          mockParksRepository.getParkByPermalink.mockReturnValueOnce(O.none);

          const { query } = createTestClient(server);
          const actual = await query({
            query: GET_PARK,
            variables: { id: 'MAGIC_KINGDOM' },
          });

          expect(actual).toMatchSnapshot();
        });
      });
    });
  });
});
