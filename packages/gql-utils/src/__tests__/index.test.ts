import {
  ServerInfo,
  ApolloServer,
  gql,
  makeExecutableSchema,
} from 'apollo-server';
import { mockDeep } from 'jest-mock-extended';

import { constructApolloServer, startApolloServer } from '../index';

describe('gql-utils', () => {
  const typeDefs = gql`
    type Query {
      _placeholder: String!
    }
  `;

  const schema = makeExecutableSchema({ typeDefs, resolvers: {} });

  describe('constructApolloServer', () => {
    it('returns an instance of an ApolloServer', () => {
      const actual = constructApolloServer({ schema, context: () => ({}) });

      expect(actual).toBeInstanceOf(ApolloServer);
    });
  });

  describe('startApolloServer', () => {
    it('starts the apollo server', async () => {
      const server = mockDeep<ApolloServer>();
      const port = 8000;

      server.listen.mockResolvedValue(mockDeep<ServerInfo>());

      await startApolloServer(port)(server);

      expect(server.listen).toBeCalledTimes(1);
      expect(server.listen).toBeCalledWith(port);
    });
  });
});
