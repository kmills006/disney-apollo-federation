import {
  chain,
  mapLeft,
  tryCatch,
  Either,
} from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import fs from 'fs';

import { IParkError } from '@models/ParkError';

export const readJsonFile = (file: string): Either<Error, string> => (
  tryCatch(
    () => fs.readFileSync(file).toString(),
    (e) => e as Error,
  )
);

export const parseJsonContent = <T>(json: string): Either<Error, T> => (
  tryCatch(
    () => JSON.parse(json),
    (error) => error as Error,
  )
);

export const parseJsonFile = <T>(filename: string): Either<IParkError, T> => pipe(
  readJsonFile(filename),
  chain((json) => parseJsonContent<T>(json)),
  mapLeft((e) => ({
    cause: e,
    message: `Unable to parse json file to build table: ${e.message}`,
  })),
);
