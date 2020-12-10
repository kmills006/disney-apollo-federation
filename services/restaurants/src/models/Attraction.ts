import * as O from 'fp-ts/lib/Option';

export interface IRestaurant {
  name: string;
  permalink: string;
  categoryCode: string;
  url: string;
  menus: O.Option<String[]>;
  openedOn: O.Option<Date>;
}
