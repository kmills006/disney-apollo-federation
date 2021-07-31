import { getOrElseW, map } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

import { db } from './db';
import { Park } from './model';
import { parkRepository } from './repository';
import { initiateApolloServer } from './graphql/server';

const PORT = process.env.PORT || 4001;

const server = pipe(
  db<Park[]>('src/parks.json'),
  map(parkRepository),
  map((repository) => initiateApolloServer(repository)),
  getOrElseW((err) => {
    console.error(`Unable to initiate Apollo Server: ${err.message}`);
    process.exit(1);
  }),
);

server
  .listen(PORT)
  .then(() => console.log(`Parks GraphQL running on port ${PORT}`));
