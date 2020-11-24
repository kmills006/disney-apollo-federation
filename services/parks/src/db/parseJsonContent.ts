import { tryCatch, Either } from 'fp-ts/lib/Either';

export type ParseJsonContent = <T>(json: string) => Either<Error, T>;

export const parseJsonContent: ParseJsonContent = (json) => (
  tryCatch(
    () => JSON.parse(json),
    (error) => error as Error,
  )
);
