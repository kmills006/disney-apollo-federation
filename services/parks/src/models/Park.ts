export interface IPark {
  id: ParkId;
  name: string;
  permalink: string;
}

export type RawPark = Omit<IPark, 'id'>;

export enum ParkId {
  ANIMAL_KINGDOM = 'ANIMAL_KINGDOM',
  EPCOT = 'EPCOT',
  HOLLYWOOD_STUDIOS = 'HOLLYWOOD_STUDIOS',
  MAGIC_KINGDOM = 'MAGIC_KINGDOM',
}

export type ParkPermalink = 'magic-kingdom' |
'animal-kingdom' |
'epcot' |
'hollywood-studios';
