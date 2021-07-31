import { RESTDataSource } from 'apollo-datasource-rest';
import * as TE from 'fp-ts/lib/TaskEither';

import { AttractionRaw, AttractionDetailRaw, ParkPermalink } from '../model';

export class AttractionAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'https://touringplans.com/';
  }

  public getAttractions = (
    parkPermalink: ParkPermalink,
  ): TE.TaskEither<Error, AttractionRaw[]> =>
    TE.tryCatch(
      () => this.get(`${parkPermalink}/attractions.json`),
      (reason) => reason as Error,
    );

  public getAttractionDetails = (
    parkPermalink: ParkPermalink,
    attractionPermalink: string,
  ): TE.TaskEither<Error, AttractionDetailRaw> =>
    TE.tryCatch(
      () =>
        this.get(`${parkPermalink}/attractions/${attractionPermalink}.json`),
      (reason) => reason as Error,
    );
}
