import { ApolloServer } from 'apollo-server';
import 'dotenv/config';

import { PORT } from './config';
import { AttractionsApi } from './datasources/AttractionsApi';
import { resolvers } from './resolvers';
import { typeDefs } from './type-defs';

const startServer = async () => {
  console.log('server started');

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    dataSources: () => ({
      attractionsApi: new AttractionsApi(),
    }),
  });

  server.listen({ port: PORT }).then(({ url }: { url: string }) => {
    console.log(`Apollo Server ready @ ${url}`);
  });
};

startServer().catch((error: Error) => {
  console.error(`Error starting server: ${error.message}`);

  process.exit(1);
});
