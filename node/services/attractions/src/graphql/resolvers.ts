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
  Attraction: {
    detail: (parent, _, ctx) => {
      const asyncOps = flow(
        ctx.dataSources.attractions.getAttractionDetails,
        taskEitherMap(adaptor.attractionDetail.toGql),
      )(parent.park.permalink, parent.permalink);

      return asyncOps()
        .then(getOrElseW((err) => {
          throw new ApolloError(err.message);
        }));
    },
  },

  Park: {
    attractions: (parent: { permalink: ParkPermalink }, _, ctx) => {
      const toGql = adaptor.attraction.toGql(parent);

      const asyncOps = flow(
        ctx.dataSources.attractions.getAttractions,
        taskEitherMap(arrayMap(toGql)),
      )(parent.permalink);

      return asyncOps()
        .then(getOrElseW((err) => {
          throw new ApolloError(err.message);
        }));
    },
  },
});

export const attractionResolvers = resolvers(attractionAdaptor());
