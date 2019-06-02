import uniqueId from 'lodash/uniqueId';

import { Park } from '../typings';

export const parks = [
  {
    id: uniqueId(),
    name: 'Animal Kingdom',
    permalink: Park.ANIMAL_KINGDOM,
  },
  {
    id: uniqueId(),
    name: 'Epcot',
    permalink: Park.EPCOT,
  },
  {
    id: uniqueId(),
    name: 'Hollywood Studios',
    permalink: Park.HOLLYWOOD_STUDIOS,
  },
  {
    id: uniqueId(),
    name: 'Magic Kingdom',
    permalink: Park.MAGIC_KINGDOM,
  },
];
