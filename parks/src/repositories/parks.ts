import { fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';

import { IPark } from '@models/Park';

// TODO: Fix module path
import { parseJsonFile } from '../db';

export interface IParkRepository {
  getParks: () => any;
}

export const repository = (parks: IPark[]): IParkRepository => ({
  getParks: () => {
    console.log('Get Parks', parks);
  },
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
