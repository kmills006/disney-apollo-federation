import { Either, tryCatch } from 'fp-ts/lib/Either';
import fs from 'fs';

export const readJsonFile = (file: string): Either<Error, string> => (
  tryCatch(
    () => fs.readFileSync(file).toString(),
    (e) => e as Error,
  )
);
