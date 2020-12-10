import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    restaurants: [Restaurant!]!
  }

  type Restaurant @key(fields: "permalink") {
    name: String!
    permalink: String!
    # TODO: Make me an enum
    categoryCode: String!
    url: String!
    menus: [String]!
    openedOn: String
  }

  extend type Park @key(fields: "permalink") {
    permalink: String! @external

    restaurantsConnection(first: Int, after: String): RestaurantConnection!

    restaurants: [Restaurant!]!

    highestRatedRestaurants: Restaurant!
  }

  type RestaurantConnection {
    edges: [ParkRestaurantEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type PageInfo {
    endCursor: String!
    hasNextPage: Boolean!
  }

  type ParkRestaurantEdge {
    cursor: String!
    node: Restaurant
  }
`;
