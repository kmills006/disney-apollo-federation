import camelcaseKeys from 'camelcase-keys';

import { Attraction, AttractionRaw } from './model';

export type AttractionAdaptor = {
  toGql: (a: AttractionRaw) => Attraction;
};

export const attractionAdaptor = (): AttractionAdaptor => ({
  toGql: (a) => ({
    ...camelcaseKeys(a),
    __typename: 'Attraction',
  }),
});
