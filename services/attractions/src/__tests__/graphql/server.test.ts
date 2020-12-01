import { buildFederatedSchema } from '@apollo/federation';
import { constructApolloServer } from '@disney-federation/gql-utils';
import { ApolloServer, gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { mockDeep } from 'jest-mock-extended';
import * as TE from 'fp-ts/lib/TaskEither';

import { MOCK_ATTRACTIONS } from '../../__mocks__/attractions';
import { resolvers } from '../../graphql/resolvers';
import { typeDefs } from '../../graphql/typeDefs';
import { IAttractionsRepository } from '../../repositories/attractions';

describe('graphql', () => {
  describe('server', () => {
    const mockAttractionsRepository = mockDeep<IAttractionsRepository>();

    let server: ApolloServer;

    beforeEach(() => {
      server = constructApolloServer({
        schema: buildFederatedSchema({ resolvers, typeDefs }),
        context: () => ({
          repositories: { attractions: mockAttractionsRepository },
        }),
      });
    });

    describe('Park', () => {

    });

    describe('queries', () => {
      describe('attractions', () => {
        const GET_ATTRACTIONS = gql`query { attractions { name permalink } }`;

        it('returns a list of attractions', async () => {
          mockAttractionsRepository.getAttractions.mockReturnValue(TE.right(MOCK_ATTRACTIONS));

          const { query } = createTestClient(server);
          const actual = await query({ query: GET_ATTRACTIONS });

          expect(actual).toMatchSnapshot();
        });

        it('throws an ApolloError', async () => {
          mockAttractionsRepository.getAttractions.mockReturnValue(TE.left(new Error('forced error')));

          const { query } = createTestClient(server);
          const actual = await query({ query: GET_ATTRACTIONS });

          expect(actual).toMatchSnapshot();
        });
      });
    });
  });
});
