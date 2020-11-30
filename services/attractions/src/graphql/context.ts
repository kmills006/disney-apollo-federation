import { attractionsRepository, IAttractionsRepository } from '../repositories/attractions';

export interface IResolverContext {
  repositories: {
    attractions: IAttractionsRepository,
  },
}

export const context = (): IResolverContext => ({
  repositories: {
    attractions: attractionsRepository(),
  },
});
