export const resolvers = {
  Park: {
    restaurants: ({ permalink }: { permalink: string }, _: undefined, context: any) => {
      return context.dataSources.diningApi.getRestaurants(permalink);
    },
  },
  // TODO: This should take a Park permalink
  restaurants: async (_: undefined, __: undefined, context: any) => {
    const { dataSources } = context;

    return dataSources.diningApi.getRestaurants('magic-kingdom');
  },
};
