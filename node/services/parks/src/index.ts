import { fold, map } from 'fp-ts/Either';
import { identity, pipe } from 'fp-ts/function';

import { db } from './db';
import { Park } from './model';
import { parkRepository } from './repository';
import { initiateApolloServer } from './graphql/server';

// TODO: Don't hard code the port in real life.
const PORT = 4001;

const server = pipe(
  db<Park[]>('src/parks.json'),
  map(parkRepository),
  map((repository) => initiateApolloServer(repository)),
  fold((err) => {
    console.error(`Unable to initiate Apollo Server: ${err.message}`);
    process.exit(1);
  }, identity),
);

server
  .listen(PORT)
  .then(() => console.log(`Parks GraphQL API running on port ${PORT}`));
