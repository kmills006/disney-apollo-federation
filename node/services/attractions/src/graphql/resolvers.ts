import { GraphQLResolverMap } from 'apollo-graphql';
import { ApolloError } from 'apollo-server';
import { map as arrayMap } from 'fp-ts/Array';
import { getOrElseW } from 'fp-ts/Either';
import { flow } from 'fp-ts/function';
import { map as taskEitherMap } from 'fp-ts/TaskEither';

import { AttractionAPI } from './datasource';
import { AttractionAdaptor, attractionAdaptor } from '../adaptors';
import { ParkPermalink } from '../model';

export type AttractionContext = {
  dataSources: {
    attractions: AttractionAPI;
  };
};

export const resolvers = (adaptor: AttractionAdaptor): GraphQLResolverMap<AttractionContext> => ({
  Park: {
    attractions: (parent: { permalink: ParkPermalink }, _, ctx) => {
      const asyncOps = flow(
        ctx.dataSources.attractions.getAttractions,
        taskEitherMap(arrayMap(adaptor.toGql)),
      )(parent.permalink);

      return asyncOps()
        .then(getOrElseW((err) => {
          throw new ApolloError(err.message);
        }));
    },
  },
});

export const attractionResolvers = resolvers(attractionAdaptor());
