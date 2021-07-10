// import { flow } from 'fp-ts/function';

import { TaskEither, left } from 'fp-ts/lib/TaskEither';

import { Attraction, AttractionDetail } from './model';
import { AttractionAPI } from './graphql/datasource';

export type AttractionRepository = {
  getParkAttractions: TaskEither<Error, Attraction[]>;
  getParkAttractionsDetails: TaskEither<Error, AttractionDetail>;
};

export const attractionsRepository = (api: AttractionAPI): AttractionRepository => ({
  getParkAttractions: () => {
    console.log('api', api);
    return left(Error('No implemented yet.')) as any;
  },

  getParkAttractionsDetails: () => left(Error('No implemented yet.')) as any,
});
