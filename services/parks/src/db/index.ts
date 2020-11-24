import { chain, mapLeft, Either } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';

import { IParkError } from '../models/ParkError';
import { readFile, ReadFile } from './readFile';
import { parseJsonContent, ParseJsonContent } from './parseJsonContent';

export const parse = (
  read: ReadFile,
  parseJson: ParseJsonContent,
) => <T>(filename: string): Either<IParkError, T> => pipe(
  read(filename),
  chain((json) => parseJson<T>(json)),
  mapLeft((e) => ({
    cause: e,
    message: `Unable to parse json file to build table: ${e.message}`,
  })),
);

export const parseJsonFile = parse(readFile, parseJsonContent);
