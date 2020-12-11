import * as O from 'fp-ts/lib/Option';
import * as P from 'fp-ts/lib/pipeable';
import { ResolverFunc, ResolveType } from '@disney-federation/gql-utils';

import { IPark, ParkId } from '../models/Park';
import { IParkError } from '../models/ParkError';
import { IResolverContext } from './context';

type IGraphQLError = Pick<IParkError, 'message'>;
type NoParkFoundError = IGraphQLError;

type ParkPayload = IPark | NoParkFoundError;
type ParkPayloadTypeName = 'Park' | 'NoParkFoundError';

interface IQueryResolvers {
  parks: ResolverFunc<IPark[], IResolverContext>;
  park: ResolverFunc<ParkPayload, IResolverContext, { id: ParkId }>
}

interface IParkPayloadResolvers {
  __resolveType: ResolveType<ParkPayload, ParkPayloadTypeName>;
}

export interface IResolvers {
  [key: string]: {};
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
    park: (_, args, ctx) => P.pipe(
      ctx.repositories.parks.getParkByPermalink(args.id),
      O.getOrElseW(() => ({
        message: `Park with id [${args.id}] not found.`,
      })),
    ),
  },
};
