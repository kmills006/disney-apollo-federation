import { RESTDataSource } from 'apollo-datasource-rest';
import flatten from 'lodash/flatten';

export class DiningApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://touringplans.com';
  }

  public async getRestaurants(park: string) {
    try {
      // TODO: investigate why its a nested array
      const results = await this.get(`/${park}/dining.json`);

      return flatten(results);
    } catch (error) {
      // TODO: handle errors
      console.error(`Error fetching WDW restaurants: ${error.message}`);
    }
  }
}
