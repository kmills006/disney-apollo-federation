import { gql } from 'apollo-server';

import { Park } from './typings';

export const typeDefs = gql`
  extend type Query {
    parks: [Park]
  }

  type Park @key(fields: "id"){
    id: Int!
    name: String
    permalink: Permalink!
  }

  enum Permalink {
    ${Object.keys(Park)}
  }
`;
