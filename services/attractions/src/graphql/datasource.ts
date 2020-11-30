import { RESTDataSource } from 'apollo-datasource-rest';
import { InMemoryLRUCache } from 'apollo-server-caching';

import { ParkPermalink } from '../types';

export class AttractionAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'https://touringplans.com/';

    // Required in order to use the RESTDatasource without passing it
    // to an ApolloServer
    this.initialize({ cache: new InMemoryLRUCache(), context: {} });
  }

  public async getAttractions(park: ParkPermalink) {
    return this.get(`${park}/attractions.json`);
  }
}
