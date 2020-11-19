import { ApolloError } from 'apollo-server';
import { fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { GraphQLResolveInfo } from 'graphql/type';

import { IPark } from '@models/Park';
import { IResolverContext } from './context';

type ResolverFunc<R, A = {}, P = {}> = (
  parent: P,
  args: A,
  ctx: IResolverContext,
  info: GraphQLResolveInfo
) => R;

interface IQueryResolvers {
  parks: ResolverFunc<IPark[]>;
}

interface IResolvers {
  Query: IQueryResolvers;
}

export const resolvers: IResolvers = {
  Query: {
    parks: (_, __, ctx) => pipe(
      ctx.repositories.parks.getParks(),
      fold(
        (e) => { throw new ApolloError(e.message); },
        (parks) => parks,
      ),
    ),
  },
};
