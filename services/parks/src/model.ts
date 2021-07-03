export enum ParkPermalink {
  MagicKingdom = 'magic-kingdom',
  Epcot = 'epcot',
  AnimalKingdom = 'animal-kingdom',
  HollywoodStudios = 'hollywood-studios',
}

export type Park = {
  name: string;
  permalink: ParkPermalink;
};
