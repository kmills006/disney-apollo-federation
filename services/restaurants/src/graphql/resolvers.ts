import { ApolloError, UserInputError } from 'apollo-server';
import { ResolverFunc } from '@disney-federation/gql-utils';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import * as P from 'fp-ts/lib/pipeable';

import { IResolverContext } from './context';
import { IRestaurant } from '../models/Attraction';
import { ParkPermalink } from '../types';

export interface IQueryResolvers {
  restaurants: ResolverFunc<Promise<IRestaurant[]>, IResolverContext>;
}

type Park = { permalink: ParkPermalink };

type ParkResolverFunc =
  ResolverFunc<Promise<IRestaurant[]>, IResolverContext, never, Park>;

type ConnectionInput = {
  first: number;
  after?: string;
};

interface IRestaurantConnection {
  totalCount: number;
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
  edges: {
    cursor: string;
    node?: IRestaurant;
  }[];
}

type RestaurantsConnectionFunc =
  ResolverFunc<Promise<IRestaurantConnection>, IResolverContext, ConnectionInput, Park>;

export interface IParkResolvers {
  restaurants: ParkResolverFunc;
  restaurantsConnection: RestaurantsConnectionFunc;
}

export interface IResolvers {
  // TODO: Fix me
  [key: string]: any;
  Query: IQueryResolvers;
  Park: IParkResolvers;
}

// TODO: Make a proper Error object instead of throwing
const handleError = (e: Error) => { throw new ApolloError(e.message); };
const handleResponse = (a: IRestaurant[]) => T.of(a);

export const resolvers: IResolvers = {
  Park: {
    restaurants: (parent, _, ctx) => P.pipe(
      ctx.repositories.restaurants.getParkRestaurants(parent.permalink),
      TE.fold(handleError, handleResponse),
    )(),

    restaurantsConnection: async (parent, input, ctx) => {
      if (input.first < 0) {
        throw new UserInputError('First must be positive. But lets be smart here and use a PostiveInt scalar...');
      }

      const restaurants = await P.pipe(
        ctx.repositories.restaurants.getParkRestaurants(parent.permalink),
        TE.fold(handleError, handleResponse),
      )();

      const totalCount = restaurants.length;

      let start = 0;

      // TODO: Handle After
      if (input.after) {
        const buff = Buffer.from(input.after, 'base64');
        const permalink = buff.toString('ascii');
        const index = restaurants.findIndex((r: IRestaurant) => r.permalink === permalink);

        if (index === -1) {
          throw new UserInputError('Invalid cursor');
        }

        start = index + 1;
      }

      const nodes: IRestaurant[] = !input.first
        ? restaurants
        : restaurants.splice(start, start + input.first);

      const edges = nodes.map((restaurant) => {
        const buffer = Buffer.from(restaurant.permalink);
        const cursor = buffer.toString('base64');

        return { cursor, node: restaurant };
      });

      const pageInfo = {
        endCursor: edges[edges.length - 1].cursor,
        hasNextPage: start + input.first < totalCount,
      };

      return {
        edges,
        pageInfo,
        totalCount,
      };
    },
  },

  Query: {
    restaurants: async (_, __, ctx) => (
      P.pipe(
        ctx.repositories.restaurants.getRestaurants(),
        TE.fold(handleError, handleResponse),
      )()
    ),
  },
};
