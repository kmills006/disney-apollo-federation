import uuid from 'uuid';

import { IPark } from '../typings';

export const parks: IPark[] = [
  {
    id: uuid.v4(),
    name: 'Animal Kingdom',
    permalink: 'animal-kingdom',
  },
  {
    id: uuid.v4(),
    name: 'Epcot',
    permalink: 'epcot',
  },
  {
    id: uuid.v4(),
    name: 'Hollywood Studios',
    permalink: 'hollywood-studios',
  },
  {
    id: uuid.v4(),
    name: 'Magic Kingdom',
    permalink: 'magic-kingdom',
  },
];
