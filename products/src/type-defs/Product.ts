import { gql } from 'apollo-server';

export const Product = gql`
  type Product {
    name: String!
    price: Int!
  }
`;
