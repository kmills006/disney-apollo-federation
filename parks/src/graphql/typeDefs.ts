import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    _placeholder: String!

    parks: [Park!]
  }

  type Park @key(fields: "permalink") {
    "Walt Disney World Park name"
    name: String!

    "Unchanged URL for the park."
    permalink: String!
  }
`;
