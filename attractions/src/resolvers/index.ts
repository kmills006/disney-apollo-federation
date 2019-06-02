import { objectMaps } from './object-maps';
import { queries } from './queries';

export const resolvers = {
  Query: queries,
  ...objectMaps,
};
