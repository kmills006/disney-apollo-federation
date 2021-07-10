import camelcaseKeys from 'camelcase-keys';

import {
  Attraction,
  AttractionDetail,
  AttractionDetailRaw,
  AttractionRaw,
} from './model';

export type AttractionAdaptor = {
  attraction: {
    toGql: <P>(parent: P) => (a: AttractionRaw) => Attraction;
  },
  attractionDetail: {
    toGql: (a: AttractionDetailRaw) => AttractionDetail;
  },
};

export const attractionAdaptor = (): AttractionAdaptor => ({
  attraction: {
    toGql: (p) => (a) => ({
      ...camelcaseKeys(a),
      park: p,
      __typename: 'Attraction',
    }),
  },

  attractionDetail: {
    toGql: (a) => ({
      ...camelcaseKeys(a),
      __typename: 'AttractionDetail',
    }),
  },
});
