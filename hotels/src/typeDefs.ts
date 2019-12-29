import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    hotels: [Hotel]
  }

  type Hotel {
    id: Int!
    property_id: Int
    name: String
    code: String
    permalink: String
  }
`;
