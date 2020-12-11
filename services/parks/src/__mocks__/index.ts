import { IPark, ParkId } from '../models/Park';

export const MOCK_PARKS: IPark[] = [
  {
    id: ParkId.EPCOT,
    name: 'Park One',
    permalink: 'park-one',
  },
  {
    id: ParkId.MAGIC_KINGDOM,
    name: 'Park Two',
    permalink: 'park-two',
  },
];
