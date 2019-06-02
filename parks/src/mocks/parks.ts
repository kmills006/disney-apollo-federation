import uniqueId from 'lodash/uniqueId';

import { Park } from '../typings';

export const parks = [
  {
    id: parseInt(uniqueId(), 10),
    name: 'Animal Kingdom',
    permalink: Park.ANIMAL_KINGDOM,
  },
  {
    id: parseInt(uniqueId(), 10),
    name: 'Epcot',
    permalink: Park.EPCOT,
  },
  {
    id: parseInt(uniqueId(), 10),
    name: 'Hollywood Studios',
    permalink: Park.HOLLYWOOD_STUDIOS,
  },
  {
    id: parseInt(uniqueId(), 10),
    name: 'Magic Kingdom',
    permalink: Park.MAGIC_KINGDOM,
  },
];
