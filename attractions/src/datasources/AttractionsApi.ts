import { RESTDataSource } from 'apollo-datasource-rest';

export class AttractionsApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://touringplans.com/magic-kingdom';
  }

  public async getAttractions() {
    return this.get('/attractions.json');
  }
}
