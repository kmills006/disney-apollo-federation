import * as A from 'fp-ts/lib/Array';
import * as P from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';

import { RestaurantAPI } from '../graphql/datasource';
import { IRestaurant } from '../models/Attraction';
import { ParkPermalink } from '../types';

export interface IRestaurantsRepository {
  getRestaurants: () => TE.TaskEither<Error, IRestaurant[]>;
  getParkRestaurants: (park: ParkPermalink) => TE.TaskEither<Error, IRestaurant[]>;
}

// TODO: Fix typing
const flatten = (v: any): any => (
  Array.isArray(v) ? [].concat(...v.map(flatten)) : v
);

export const repository = (api: RestaurantAPI) => (): IRestaurantsRepository => ({
  getRestaurants() {
    const ops = Object.values(ParkPermalink).map((park) => this.getParkRestaurants(park));

    return P.pipe(
      A.array.sequence(TE.taskEither)(ops),
      TE.map((a) => flatten(a)),
    );
  },

  getParkRestaurants: (park) => TE.tryCatch(
    async () => {
      const response = await api.getRestaurants(park);
      return flatten(response);
    },
    (reason) => reason as Error,
  ),
});

export const restaurantsRepository = repository(new RestaurantAPI());
