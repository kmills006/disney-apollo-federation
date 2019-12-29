import { gql } from 'apollo-server';

import { convertPermalink } from './helpers';
import { mocks } from './mocks';

export const typeDefs = gql`
  enum ParkPermalink {
    ${mocks.parks.map(park => convertPermalink(park.permalink).toUpperCase()).join(' ')}
  }

  type Query {
    park(permalink: ParkPermalink!): Park
    parks: [Park]
  }

  # Create a Park Entity by defining a key
  # The key directive identifies a specific instance of the type
  type Park @key(fields: "permalink") {
    id: String!
    name: String!
    permalink: String!
  }
`;
