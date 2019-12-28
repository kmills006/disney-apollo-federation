import { gql } from 'apollo-server';

import { convertPermalink } from './helpers';
import { mocks } from './mocks';

export const typeDefs = gql`
  enum ParkPermalink {
    ${mocks.parks.map(park => convertPermalink(park.permalink).toUpperCase()).join(' ')}
  }

  extend type Query {
    park(permalink: ParkPermalink!): Park
    parks: [Park]
  }

  type Park @key(fields: "id") {
    id: String!
    name: String!
    permalink: String!
  }
`;
