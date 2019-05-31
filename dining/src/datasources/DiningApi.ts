import { RESTDataSource } from 'apollo-datasource-rest';
import flatten from 'lodash/flatten';

export class DiningApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://touringplans.com/magic-kingdom';
  }

  public async getRestaurants() {
    try {
      // TODO: investigate why its a nested array
      const results = await this.get('/dining.json');

      return flatten(results);
    } catch (error) {
      // TODO: handle errors
      console.error(`Error fetching WDW restaurants: ${error.message}`);
    }
  }
}
