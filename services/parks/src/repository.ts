import { findIndex, lookup } from 'fp-ts/Array';
import { chain, Option } from 'fp-ts/Option';
import { flow } from 'fp-ts/function';

import { Park, ParkPermalink } from './model';

export type ParkRepository = {
  getParks: () => Park[];
  getParkByPermalink: (permalink: ParkPermalink) => Option<Park>;
};

export const parkRepository = (records: Park[]): ParkRepository => ({
  getParks: () => records,

  getParkByPermalink: (permalink) =>
    flow(
      findIndex((park: Park) => park.permalink === permalink),
      chain((i) => lookup(i)(records)),
    )(records),
});
