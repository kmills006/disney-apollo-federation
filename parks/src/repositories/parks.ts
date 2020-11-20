import { fold, tryCatch, Either } from 'fp-ts/lib/Either';
import { fromNullable, Option } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

import { IPark } from '@models/Park';
import { IParkError } from '@models/ParkError';
import { handleParkError } from '../helpers/handleParkError';

// TODO: Fix module path
import { parseJsonFile } from '../db';

type IParkRepositoryError = IParkError;

export interface IParkRepository {
  getParks: () => Either<IParkRepositoryError, IPark[]>;
  getParkByPermalink: (permalink: string) => Option<IPark>;
}

export const repository = (parks: IPark[]) => (): IParkRepository => ({
  getParks: () => tryCatch(
    () => parks,
    (e) => handleParkError(e as Error),
  ),

  getParkByPermalink: (permalink) => (
    fromNullable(parks.find((p) => p.permalink === permalink))
  ),
});

const parks = pipe(
  parseJsonFile<IPark[]>('src/db/parks.json'),
  fold(
    (e) => {
      console.warn(`Unable to parse parks.json: ${e.message}`);
      return [];
    },
    (p) => p,
  ),
);

console.log('parks', parks);

export const parkRepository = repository(parks);
