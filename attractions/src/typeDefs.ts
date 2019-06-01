import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    attractions: [Attraction]
  }

  type Attraction @key(fields: "permalink") {
    name: String!
    short_name: String!
    permalink: String!
  }
`;
