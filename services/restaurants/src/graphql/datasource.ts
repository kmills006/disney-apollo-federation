import { RESTDataSource } from 'apollo-datasource-rest';
import { InMemoryLRUCache } from 'apollo-server-caching';

import { ParkPermalink } from '../types';

export class RestaurantAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'https://touringplans.com/';

    // Required in order to use the RESTDatasource without passing it
    // to an ApolloServer
    this.initialize({ cache: new InMemoryLRUCache(), context: {} });
  }

  public async getRestaurants(park: ParkPermalink) {
    return this.get(`${park}/dining.json`);
  }
}
