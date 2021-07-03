import { findIndex, lookup } from 'fp-ts/Array';
import { chain, Option, some } from 'fp-ts/Option';
import { flow } from 'fp-ts/function';

import { Park, ParkPermalink } from './model';

export type ParkRepository = {
  getParks: () => Option<Park[]>;
  getParkByPermalink: (permalink: ParkPermalink) => Option<any>;
};

export const parkRepository = (records: Park[]): ParkRepository => ({
  getParks: () => some(records),
  getParkByPermalink: (permalink) =>
    flow(
      findIndex((park: Park) => park.permalink === permalink),
      chain((i) => lookup(i)(records)),
    )(records),
});
