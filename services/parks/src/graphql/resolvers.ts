import { GraphQLResolverMap } from 'apollo-graphql';
import { pipe } from 'fp-ts/function';
import { chain, map, getOrElseW } from 'fp-ts/Option';
import { fromMap, lookup } from 'fp-ts/ReadonlyMap';
import { Eq as stringEq } from 'fp-ts/string';

import { Park, ParkPermalink } from '../model';
import { ParkRepository } from '../repository';

export type ParkContext = {
  repository: ParkRepository;
};

type FieldResponse<R> = R & { __typename: string };
type ParkByPermalinkResponse =
  | FieldResponse<Park>
  | FieldResponse<{ message: string }>;

const permalinkMapping = fromMap(
  new Map<string, ParkPermalink>([
    ['ANIMAL_KINGDOM', ParkPermalink.AnimalKingdom],
    ['EPCOT', ParkPermalink.Epcot],
    ['HOLLYWOOD_STUDIOS', ParkPermalink.HollywoodStudios],
    ['MAGIC_KINGDOM', ParkPermalink.MagicKingdom],
  ]),
);

export const resolvers: GraphQLResolverMap<ParkContext> = {
  Query: {
    parks: (_, __, ctx): Park[] => ctx.repository.getParks(),

    parkByPermalink: (_, { permalink }, ctx): ParkByPermalinkResponse =>
      pipe(
        lookup(stringEq)(permalink)(permalinkMapping),
        chain(ctx.repository.getParkByPermalink),
        map((park) => ({ ...park, __typename: 'Park' })),
        getOrElseW(() => ({
          message: `No park found for permalink [${permalink}]`,
          __typename: 'NoParkFoundError',
        })),
      ),
  },
};
