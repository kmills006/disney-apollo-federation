export const resolvers = {
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
