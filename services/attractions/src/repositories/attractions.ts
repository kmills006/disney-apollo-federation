import * as A from 'fp-ts/lib/Array';
import * as P from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';

import { AttractionAPI } from '../graphql/datasource';
import { IAttraction } from '../models/Attraction';
import { ParkPermalink } from '../types';

export interface IAttractionsRepository {
  getAttractions: () => TE.TaskEither<Error, IAttraction[]>;

  getParkAttractions: (park: ParkPermalink) => TE.TaskEither<Error, IAttraction[]>;
}

export const repository = (api: AttractionAPI) => (): IAttractionsRepository => ({
  getAttractions() {
    const ops = Object.values(ParkPermalink).map((park) => this.getParkAttractions(park));

    return P.pipe(
      A.array.sequence(TE.taskEither)(ops),
      TE.map((a) => a.flat()),
    );
  },

  getParkAttractions: (park) => TE.tryCatch(
    () => api.getAttractions(park),
    (reason) => reason as Error,
  ),
});

export const attractionsRepository = repository(new AttractionAPI());
