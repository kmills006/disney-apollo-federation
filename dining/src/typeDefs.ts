import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    restaurants: [Restaurant]
  }

  type Restaurant @key(fields: "id") {
    id: Int!
    name: String
    permalink: String
  }
`;
