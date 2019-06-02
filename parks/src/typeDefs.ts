import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    park(id: Int!): Park
    parks: [Park]
  }

  type Park @key(fields: "id") {
    id: Int!
    name: String!
    permalink: String!
  }
`;
