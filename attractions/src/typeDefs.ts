import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    attractions: [Attraction]
  }

  type Attraction @key(fields: "permalink") {
    name: String!
    short_name: String!
    permalink: String!
    park: Park @provides(fields: "id")
  }

  extend type Park @key(fields: "id") {
    id: String! @external
    attractions: [Attraction]
  }
`;
