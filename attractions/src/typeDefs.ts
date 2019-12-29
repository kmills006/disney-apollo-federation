import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    attractions(park: String!): [Attraction]
  }

  # Create a Attraction Entity by defining a key
  # The key directive identifies a specific instance of the type
  type Attraction @key(fields: "permalink") {
    name: String!
    short_name: String!
    permalink: String!
  }

  # Park is defined in another service and we need to define a stub of the type
  # in the service referencing it with enough information to enable composition.
  # This allows us the ability to run the Attraction service standalone with a valid schema.
  # https://www.apollographql.com/docs/apollo-server/federation/core-concepts/#referencing-external-types
  extend type Park @key(fields: "permalink") {
    permalink: String! @external

    # Add a list of attractions to a Park
    attractions: [Attraction!]
  }
`;
