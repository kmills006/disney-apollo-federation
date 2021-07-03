import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Park @key(fields: "permalink") {
    permalink: ID!
    name: String!
  }

  type NoParkFoundError {
    message: String!
    code: ParkErrorCode!
  }

  enum ParkErrorCode {
    NO_PARK_FOUND
  }

  union ParkByPermalinkResponse = Park | NoParkFoundError

  type Query {
    parks: [Park!]!
    parkByPermalink: ParkByPermalinkResponse!
  }
`;
