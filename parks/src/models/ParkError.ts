export interface IParkError {
  cause: Error;
  message: string;
}

export type IGraphQLError = Pick<IParkError, 'message'>;
