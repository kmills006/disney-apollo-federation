import { AttractionDetail } from './AttractionDetail';
import { Park } from './Park';

export type Attraction = {
  name: string,
  permalink: string,
  park: Park,
  detail?: AttractionDetail,
};
