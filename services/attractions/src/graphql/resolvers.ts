import { ResolverFunc } from '@disney-federation/gql-utils';
// import * as F from 'fp-ts/lib/function';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import * as P from 'fp-ts/lib/pipeable';

import { IResolverContext } from './context';
import { IAttraction } from '../models/Attraction';
import {ApolloError} from 'apollo-server';

export interface IQueryResolvers {
  attractions: ResolverFunc<Promise<IAttraction[]>, IResolverContext>;
}

export interface IResolvers {
  [key: string]: any;
  Query: IQueryResolvers;
}

export const resolvers: IResolvers = {
  Query: {
    attractions: async (_, __, ctx) => {
      return P.pipe(
        ctx.repositories.attractions.getAttractions(),
        TE.fold(
          // TODO: Return Error object instead of throwing
          (error) => { throw new ApolloError(error.message); },
          (a) => T.of(a),
        ),
      )();
    },
  },
};
