// import { left, right, Either } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { rights } from 'fp-ts/lib/Array';

import { buildJsonTables } from './helpers';

export interface IDatabaseError {
  message: string;
  cause: Error;
}

export interface IDatabase {}

// const handleDatabaseError = (message: string, error: Error): IDatabaseError => ({
//   message,
//   cause: error,
// });

const database = (tables: { [key: string]: unknown }): IDatabase => {
  console.log('database.tables: ', tables);

  return {};
};

export const initiateDatabase = (
  jsonFiles: string[],
): IDatabase => {
  const tables = pipe(buildJsonTables(jsonFiles), rights);

  return database(Object.assign({}, ...tables));
};
