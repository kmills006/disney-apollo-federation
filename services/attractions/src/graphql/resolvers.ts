import { ApolloError } from 'apollo-server';
import { ResolverFunc } from '@disney-federation/gql-utils';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import * as P from 'fp-ts/lib/pipeable';

import { IResolverContext } from './context';
import { IAttraction } from '../models/Attraction';
import { ParkPermalink } from '../types';

export interface IQueryResolvers {
  attractions: ResolverFunc<Promise<IAttraction[]>, IResolverContext>;
}

type ParkResolverFunc = ResolverFunc<
Promise<IAttraction[]>,
IResolverContext,
never,
{ permalink: ParkPermalink }
>;

export interface IParkResolvers {
  attractions: ParkResolverFunc;
}

export interface IResolvers {
  [key: string]: any;
  Query: IQueryResolvers;
  Park: IParkResolvers;
}

// TODO: Make a proper Error object instead of throwing
const handleError = (e: Error) => { throw new ApolloError(e.message); };
const handleResponse = (a: IAttraction[]) => T.of(a);

export const resolvers: IResolvers = {
  Park: {
    attractions: (parent, _, ctx) => P.pipe(
      ctx.repositories.attractions.getParkAttractions(parent.permalink),
      TE.fold(handleError, handleResponse),
    )(),
  },

  Query: {
    attractions: async (_, __, ctx) => (
      P.pipe(
        ctx.repositories.attractions.getAttractions(),
        TE.fold(handleError, handleResponse),
      )()
    ),
  },
};
