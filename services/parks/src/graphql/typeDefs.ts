import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    parks: [Park!]!
    park(id: ParkId!): ParkPayload!
  }

  interface Error {
    message: String!
  }

  type NoParkFoundError implements Error {
    message: String!
  }

  union ParkPayload = Park | NoParkFoundError

  type Park @key(fields: "permalink") {
    id: ParkId!
    name: String!
    permalink: String!
  }

  enum ParkId {
    ANIMAL_KINGDOM
    EPCOT
    HOLLYWOOD_STUDIOS
    MAGIC_KINGDOM
  }
`;
