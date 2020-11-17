import { chain, map, mapLeft } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';

import { parseJsonContent } from './parseJsonContent';
import { readJsonFile } from './readJsonFile';

export const buildJsonTables = (
  jsonFiles: string[],
) => jsonFiles.map((file: string) => (
  pipe(
    readJsonFile(file),
    chain(parseJsonContent),
    mapLeft((error) => {
      console.warn(`unable to parse json file: ${file}: ${error.message}`);

      return {
        message: error.message,
        cause: error,
      };
    }),
    map((r) => {
      const name = file.substring(
        file.lastIndexOf('/') + 1,
        file.lastIndexOf('.json'),
      );

      return {
        [name]: r,
      };
    }),
  )));
