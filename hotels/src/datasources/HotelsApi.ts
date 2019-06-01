import { RESTDataSource } from 'apollo-datasource-rest';
import flatten from 'lodash/flatten';

export class HotelsApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://touringplans.com/walt-disney-world';
  }

  public async getHotels() {
    try {
      const results = await this.get('/hotels.json');

      // Omit hotel category from results
      const hotelsOnly = flatten(results).map((r: any) => {
        if (typeof r === 'string') {
          return false;
        }

        return r;
      }).filter(Boolean);

      return flatten(hotelsOnly);
    } catch (error) {
      // TODO: handle errors
      console.error(`Error fetching WDW hotels: ${error.message}`);
    }
  }
}
