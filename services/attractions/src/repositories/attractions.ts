import * as A from 'fp-ts/lib/Array';
import * as E from 'fp-ts/lib/Either';
import * as P from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';

import {
  attractionDetailsAdaptor,
  AttractionDetailsAdaptor,
} from '../adaptors/attractionDetails';
import { AttractionAPI } from '../graphql/datasource';
import { Attraction } from '../models/Attraction';
import { AttractionDetail } from '../models/AttractionDetail';
import { AttractionRaw } from '../models/AttractionRaw';
import { ParkPermalink } from '../models/Park';

export interface IAttractionsRepository {
  getAttractions: () => TE.TaskEither<Error, Attraction[]>;

  getParkAttractions: (
    parkPermalink: ParkPermalink,
  ) => TE.TaskEither<Error, Attraction[]>;

  getParkAttractionDetails: (
    parkPermalink: ParkPermalink,
    attractionPermalink: string,
  ) => TE.TaskEither<Error, AttractionDetail>;
}

export const appendParkPermalinkToAttraction = (
  permalink: ParkPermalink,
  attraction: AttractionRaw,
): Attraction => ({
  ...attraction,
  park: { permalink },
});

export const repository = (
  api: AttractionAPI,
  adaptor: AttractionDetailsAdaptor,
) => (): IAttractionsRepository => ({
  getAttractions() {
    const ops = Object.values(ParkPermalink).map((park) => P.pipe(
      this.getParkAttractions(park),
    ));

    return P.pipe(
      A.array.sequence(TE.taskEither)(ops),
      TE.map((a) => a.flat()),
    );
  },

  getParkAttractions: (parkPermalink) => P.pipe(
    api.getAttractions(parkPermalink),
    TE.map((a) => a.map((v) => appendParkPermalinkToAttraction(parkPermalink, v))),
  ),

  getParkAttractionDetails: (
    parkPermalink: ParkPermalink,
    attractionPermalink: string,
  ) => P.pipe(
    api.getAttractionDetails({
      parkPermalink,
      permalink: attractionPermalink,
    }),
    TE.map((a) => P.pipe(
      adaptor.fromTouringPlans(a),
      // REVIEW: Not right, return an Error if something bad happened.
      E.fold(
        () => ({} as AttractionDetail),
        (detail) => detail,
      ),
    )),
  ),
});

export const attractionsRepository = repository(
  new AttractionAPI(),
  attractionDetailsAdaptor(),
);
