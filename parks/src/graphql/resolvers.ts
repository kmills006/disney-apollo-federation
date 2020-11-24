import { pipe } from 'fp-ts/lib/pipeable';
import * as O from 'fp-ts/lib/Option';
import { GraphQLResolveInfo } from 'graphql/type';

import { IPark, NoParkFoundError } from '@models/Park';
import { IResolverContext } from './context';

type ResolveType<P, T> = (parent: P) => T | null;

type ResolverFunc<R, A = {}, P = {}> = (
  parent: P,
  args: A,
  ctx: IResolverContext,
  info: GraphQLResolveInfo
) => R;

type ParkPayload = IPark | NoParkFoundError;
type ParkPayloadTypeName = 'Park' | 'NoParkFoundError';

interface IQueryResolvers {
  parks: ResolverFunc<IPark[]>;

  park: ResolverFunc<ParkPayload, { permalink: string }>
}

interface IParkPayloadResolvers {
  __resolveType: ResolveType<ParkPayload, ParkPayloadTypeName>;
}

export interface IResolvers {
  Query: IQueryResolvers;
  ParkPayload: IParkPayloadResolvers;
}

export const findTypeNameInParent = <T extends string, P = {}>(
  parent: P,
  mapping: string[][],
): T | null => {
  const [, typename] = mapping.find(([property]) => property in parent) || [null, null];

  return typename as T;
};

export const resolvers: IResolvers = {
  ParkPayload: {
    __resolveType: (parent) => findTypeNameInParent<ParkPayloadTypeName>(parent, [
      ['name', 'Park'],
      ['message', 'NoParkFoundError'],
    ]),
  },

  Query: {
    parks: (_, __, ctx) => ctx.repositories.parks.getParks(),

    park: (_, args, ctx) => pipe(
      ctx.repositories.parks.getParkByPermalink(args.permalink),
      O.getOrElseW(() => ({
        message: `Park with permalink [${args.permalink}] not found.`,
        permalink: args.permalink,
      })),
    ),
  },
};
