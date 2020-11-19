import {
  parkRepository,
  IParkRepository,
} from '../repositories/parks';

export interface IResolverContext {
  repositories: {
    parks: IParkRepository;
  };
}

export const context = (): IResolverContext => ({
  repositories: {
    parks: parkRepository(),
  },
});
