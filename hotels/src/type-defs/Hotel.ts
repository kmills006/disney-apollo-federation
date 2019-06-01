import { gql } from 'apollo-server';

export const Hotel = gql`
  type Hotel {
    id: Int!
    property_id: Int
    name: String
    code: String
    permalink: String
  }
`;
