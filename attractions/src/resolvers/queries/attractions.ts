// TODO: interface
export const attractions = (obj: undefined, args: undefined, context: any) => {
  const { dataSources } = context;

  return dataSources.attractionsApi.getAttractions();
};
