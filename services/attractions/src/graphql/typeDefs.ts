import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    attractions: [Attraction!]
  }

  type Attraction @key(fields: "permalink") {
    name: String!
    permalink: String!
  }

  extend type Park @key(fields: "permalink") {
    permalink: String! @external

    attractions: [Attraction!]
  }
`;
