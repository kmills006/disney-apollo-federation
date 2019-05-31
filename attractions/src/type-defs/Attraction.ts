import { gql } from 'apollo-server';

export const Attraction = gql`
  type Attraction {
    name: String!
    short_name: String!
    permalink: String!
  }
`;
