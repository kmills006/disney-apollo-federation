import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    parks: [Park!]

    park(permalink: String!): ParkPayload!
  }

  interface Error {
    message: String!
  }

  type NoParkFoundError implements Error {
    message: String!
    permalink: String!
  }

  union ParkPayload = Park | NoParkFoundError

  type Park @key(fields: "permalink") {
    "Walt Disney World Park name"
    name: String!

    "Unchanged URL for the park."
    permalink: String!
  }
`;
