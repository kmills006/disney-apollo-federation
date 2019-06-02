import { RESTDataSource } from 'apollo-datasource-rest';

export class AttractionsApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://touringplans.com';
  }

  public async getAttractions(park: string = 'magic-kingdom') {
    return this.get(`/${park}/attractions.json`);
  }
}
