import { Attraction } from './Attraction';

export type AttractionRaw = Omit<Attraction, 'park'>;
