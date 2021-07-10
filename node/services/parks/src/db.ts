import { chain, map, mapLeft, tryCatch } from 'fp-ts/Either';
import { parse } from 'fp-ts/Json';
import { flow } from 'fp-ts/function';
import fs from 'fs';

const readFile = (path: string) =>
  tryCatch(
    () => fs.readFileSync(path).toString(),
    (err) => err as Error,
  );

const parseJson = <T>() =>
  flow(
    parse,
    map((r) => (<unknown>r) as T),
    mapLeft((err) => Error(`Unable to parse JSON: ${(err as Error).message}`)),
  );

export const db = <T>(filePath: string) =>
  flow(readFile, chain(parseJson<T>()))(filePath);
