import { RESTDataSource } from 'apollo-datasource-rest';
import { InMemoryLRUCache } from 'apollo-server-caching';
import * as TE from 'fp-ts/lib/TaskEither';

import { ParkPermalink } from '../models/Park';
import { AttractionRaw } from '../models/AttractionRaw';
import { AttractionDetailRaw } from '../models/AttractionDetailRaw';

type GetAttractionDetailsArgs = {
  parkPermalink: ParkPermalink;
  permalink: string;
};

export class AttractionAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'https://touringplans.com/';

    // Required in order to use the RESTDatasource without passing it
    // to an ApolloServer
    this.initialize({ cache: new InMemoryLRUCache(), context: {} });
  }

  public getAttractions(
    parkPermalink: ParkPermalink,
  ): TE.TaskEither<Error, AttractionRaw[]> {
    return TE.tryCatch(
      () => this.get(`${parkPermalink}/attractions.json`),
      (reason) => reason as Error,
    );
  }

  public getAttractionDetails(
    args: GetAttractionDetailsArgs,
  ): TE.TaskEither<Error, AttractionDetailRaw> {
    return TE.tryCatch(
      () => this.get(`${args.parkPermalink}/attractions/${args.permalink}.json`),
      (reason) => reason as Error,
    );
  }
}
