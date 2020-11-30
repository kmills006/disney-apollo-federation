import { RESTDataSource } from 'apollo-datasource-rest';
import { InMemoryLRUCache } from 'apollo-server-caching';

export enum ParkPermalink {
  MagicKingdom = 'magic-kingdom',
  Epcot = 'epcot',
  AnimalKingdom = 'animal-kingdom',
  HollywoodStudios = 'hollywood-studios',
}

export class AttractionAPI extends RESTDataSource {
  private endpoint = 'attractions.json';

  constructor() {
    super();

    this.baseURL = 'https://touringplans.com/';

    // Required in order to use the RESTDatasource without passing it
    // to an ApolloServer
    const cache = new InMemoryLRUCache();
    this.initialize({ context: {}, cache });
  }

  public async getAttractions(park: ParkPermalink) {
    console.log('parkPermalinks', park);

    return this.get(`${park}/${this.endpoint}`);
  }
}
