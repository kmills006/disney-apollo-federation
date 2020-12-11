import * as A from 'fp-ts/lib/Array';
import * as O from 'fp-ts/lib/Option';
import * as P from 'fp-ts/lib/pipeable';

import { parseJsonFile } from '../db';
import {
  IPark,
  ParkId,
  ParkPermalink,
  RawPark,
} from '../models/Park';

const parkIdToPermalinkMap: Record<ParkId, ParkPermalink> = {
  [ParkId.ANIMAL_KINGDOM]: 'animal-kingdom',
  [ParkId.EPCOT]: 'epcot',
  [ParkId.HOLLYWOOD_STUDIOS]: 'hollywood-studios',
  [ParkId.MAGIC_KINGDOM]: 'magic-kingdom',
};

export interface IParkRepository {
  getParks: () => IPark[];
  getParkByPermalink: (id: ParkId) => O.Option<IPark>;
}

export const repository = (parks: IPark[]) => (): IParkRepository => ({
  getParks: () => parks,
  getParkByPermalink: (id) => (
    O.fromNullable(parks.find((p) => p.permalink === parkIdToPermalinkMap[id]))
  ),
});

/// // Move out of here
const addIdToParkRecord = (park: RawPark): O.Option<IPark> => {
  const id = (Object.keys(parkIdToPermalinkMap) as ParkId[])
    .find((key) => parkIdToPermalinkMap[key] === park.permalink as ParkPermalink);

  return !id ? O.none : O.some({ id, ...park });
};

const addParkIds = (parks: RawPark[]): O.Option<IPark[]> => P.pipe(
  parks.map(addIdToParkRecord),
  A.filter(O.isSome),
  A.array.sequence(O.option),
);
/// // Move out of here

const parks = P.pipe(
  parseJsonFile<RawPark[]>('src/db/parks.json'),
  O.fromEither,
  O.chain(addParkIds),
  O.fold(() => [], (p) => p),
);

export const parkRepository = repository(parks);
