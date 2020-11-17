import { Either, tryCatch } from 'fp-ts/lib/Either';

export const parseJsonContent = (json: string): Either<Error, unknown> => (
  tryCatch(
    () => JSON.parse(json),
    (error) => error as Error,
  )
);
