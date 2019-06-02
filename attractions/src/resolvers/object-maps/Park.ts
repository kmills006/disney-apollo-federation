interface IPark {
  id: number;
}

// TODO: interfaces
export const Park = {
  attractions: async (obj: IPark, args: any, context: any) => {
    const { dataSources } = context;
    const { id } = obj;

    try {
      const result = await dataSources.parksApi.getPark(id);
      const park = result.data.response;

      const { permalink } = park;

      return dataSources.attractionsApi.getAttractions(permalink);
    } catch (error) {
      // TODO: Handle errors
      console.error(`Error fetching park: ${error.message}`);

      return [];
    }

  },
};
