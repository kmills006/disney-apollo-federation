import { restaurantsRepository, IRestaurantsRepository } from '../repositories/restaurants';

export interface IResolverContext {
  repositories: {
    restaurants: IRestaurantsRepository,
  },
}

export const context = (): IResolverContext => ({
  repositories: {
    restaurants: restaurantsRepository(),
  },
});
