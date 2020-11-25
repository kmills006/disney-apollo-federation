import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    attractions: [Attraction!]
  }

  type Attraction {
    name: String!
    park: Park!
    shortName: String!
    permalink: String!
  }

  extend type Park @key(fields: "permalink") {
    permalink: String! @external
  }
`;
