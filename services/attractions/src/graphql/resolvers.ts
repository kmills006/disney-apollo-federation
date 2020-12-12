import { ApolloError } from 'apollo-server';
import { ResolverFunc } from '@disney-federation/gql-utils';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import * as P from 'fp-ts/lib/pipeable';

import { IResolverContext } from './context';
import { Attraction } from '../models/Attraction';
import { AttractionDetail } from '../models/AttractionDetail';
import { Park } from '../models/Park';

export interface IQueryResolvers {
  attractions: ResolverFunc<Promise<Attraction[]>, IResolverContext>;
}

type ParkResolverFunc =
  ResolverFunc<Promise<Attraction[]>, IResolverContext, never, Park>;

export interface IParkResolvers {
  attractions: ParkResolverFunc;
}

type IAttractionDetailResolver = ResolverFunc<any, IResolverContext, never, Attraction>;

export interface IAttractionResolvers {
  detail: IAttractionDetailResolver;
}

export interface IResolvers {
  [key: string]: {};
  Attraction: IAttractionResolvers;
  Query: IQueryResolvers;
  Park: IParkResolvers;
}

// TODO: Make a proper Error object instead of throwing
const handleError = (e: Error) => { throw new ApolloError(e.message); };
const handleResponse = <T>(a: T) => T.of(a);

export const resolvers: IResolvers = {
  Attraction: {
    detail: async (parent, _, ctx) => P.pipe(
      ctx.repositories.attractions.getParkAttractionDetails(
        parent.park.permalink,
        parent.permalink,
      ),
      TE.fold(handleError, (r) => handleResponse<AttractionDetail>(r)),
    )(),
  },

  Park: {
    attractions: (parent, _, ctx) => P.pipe(
      ctx.repositories.attractions.getParkAttractions(parent.permalink),
      TE.fold(handleError, (r) => handleResponse<Attraction[]>(r)),
    )(),
  },

  Query: {
    attractions: async (_, __, ctx) => P.pipe(
      ctx.repositories.attractions.getAttractions(),
      TE.fold(handleError, (r) => handleResponse<Attraction[]>(r)),
    )(),
  },
};
