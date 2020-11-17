import { tryCatch, Either } from 'fp-ts/lib/Either';
import glob from 'glob';

import { initiateDatabase, IDatabase } from '../db';

interface RepositoryError {
  message: string;
  cause: Error;
}

type RepositoryGetParksError = RepositoryError;

export interface IRepository {
  getParks: () => Either<RepositoryGetParksError, any[]>;
}

const handleRepositoryError = (error: Error): RepositoryError => ({
  message: error.message,
  cause: error,
});

const repository = (db: IDatabase) => (): IRepository => {
  console.log('db', db);

  return {
    getParks: () => tryCatch(
      () => {
        throw new Error('Implementation');
      },
      (e) => handleRepositoryError(e as Error),
    ),
  };
};

const database = initiateDatabase(glob.sync('src/db/*.json'));

export const databaseRepository = repository(database);
