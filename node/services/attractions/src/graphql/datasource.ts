import { RESTDataSource } from 'apollo-datasource-rest';
import * as TE from 'fp-ts/lib/TaskEither';

import { AttractionRaw, AttractionDetailRaw } from '../model';

// type GetAttractionDetailsArgs = {
//   parkPermalink: ParkPermalink;
//   permalink: string;
// };

export class AttractionAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'https://touringplans.com/';
  }

  public getAttractions(
    parkPermalink: any,
  ): TE.TaskEither<Error, AttractionRaw[]> {
    return TE.tryCatch(
      () => this.get(`${parkPermalink}/attractions.json`),
      (reason) => reason as Error,
    );
  }

  public getAttractionDetails(
    args: any,
  ): TE.TaskEither<Error, AttractionDetailRaw> {
    return TE.tryCatch(
      () => this.get(`${args.parkPermalink}/attractions/${args.permalink}.json`),
      (reason) => reason as Error,
    );
  }
}
