// TODO: interface
export const restaurants = async (obj: undefined, args: undefined, context: any) => {
  const { dataSources } = context;

  return dataSources.diningApi.getRestaurants();
};
