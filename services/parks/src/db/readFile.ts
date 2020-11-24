import { tryCatch, Either } from 'fp-ts/lib/Either';
import fs from 'fs';

export type ReadFile = (file: string) => Either<Error, string>;

export const readFile: ReadFile = (file) => (
  tryCatch(
    () => fs.readFileSync(file).toString(),
    (e) => e as Error,
  )
);
