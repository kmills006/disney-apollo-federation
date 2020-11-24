import { fold } from 'fp-ts/lib/Either';
import { fromNullable, Option } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

import { IPark } from '../models/Park';

// TODO: Fix module path
import { parseJsonFile } from '../db';

export interface IParkRepository {
  getParks: () => IPark[];
  getParkByPermalink: (permalink: string) => Option<IPark>;
}

export const repository = (parks: IPark[]) => (): IParkRepository => ({
  getParks: () => parks,

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

export const parkRepository = repository(parks);
