export const resolvers = {
  // Object map for the Park Entity that is extended in this service.
  Park: {
    attractions: async ({ permalink }: { permalink: string }, _: undefined, context: any) => {
      return context.dataSources.attractionsApi.getAttractions(permalink);
    },
  },
  Query: {
    attractions: (args: { permalink: string }) => {
      return [];
    },
  },
};
