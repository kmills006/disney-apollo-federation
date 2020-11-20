import { IGraphQLError } from './ParkError';

export interface IPark {
  name: string;
  permalink: string;
}

export type NoParkFoundError = IGraphQLError & {
  permalink: string;
};
