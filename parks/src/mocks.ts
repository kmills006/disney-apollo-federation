import uuid from 'uuid';

import { IPark } from './typings';

const parks: IPark[] = [
  { name: 'Animal Kingdom', permalink: 'animal-kingdom' },
  { name: 'Epcot', permalink: 'epcot' },
  { name: 'Hollywood Studios', permalink: 'hollywood-studios' },
  { name: 'Magic Kingdom', permalink: 'magic-kingdom' },
].map(park => ({ ...park, id: uuid.v4() }));

export const mocks = { parks };
