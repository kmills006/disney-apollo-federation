export interface IAttraction {
  name: string;
  shortName: string;
  permalink: string;
  park?: {
    name: string;
    permalink: string;
  };
}
