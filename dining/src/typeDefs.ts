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

  # Park is defined in another service and we need to define a stub of the type
  # in the service referencing it with enough information to enable composition.
  # This allows us the ability to run the Dining service standalone with a valid schema.
  # https://www.apollographql.com/docs/apollo-server/federation/core-concepts/#referencing-external-types
  extend type Park @key(fields: "permalink") {
    permalink: String! @external

    # Add a list of restaurants to a Park
    restaurants: [Restaurant!]
  }
`;
