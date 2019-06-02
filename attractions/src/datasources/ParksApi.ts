import { GraphQLDataSource } from 'apollo-datasource-graphql';
import { gql } from 'apollo-server';

import { PARKS_SERVICE_GRAPHQL_URL } from '../config';

const PARKS = gql`
  query parks {
    response: parks {
      id
      name
      permalink
    }
  }
`;

const PARK = gql`
  query park($id: Int!) {
    response: park(id: $id) {
      id
      name
      permalink
    }
  }
`;

export class ParksApi extends GraphQLDataSource {
  public baseURL = PARKS_SERVICE_GRAPHQL_URL;

  public async getPark(id: number) {
    return this.query(PARK, {
      variables: {
        id,
      },
    });
  }

  public async getParks() {
    return this.query(PARKS);
  }
}
