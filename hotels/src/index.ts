import { ApolloServer } from 'apollo-server';
import 'dotenv/config';

import { PORT } from './config';
import { HotelsApi } from './datasources/HotelsApi';
import { resolvers } from './resolvers';
import { typeDefs } from './type-defs';

const startServer = async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    dataSources: () => ({
      hotelsApi: new HotelsApi(),
    }),
  });

  server.listen({ port: PORT }).then(({ url }: { url: string }) => {
    console.log(`🏨 Hotels service running at ${url}`);
  });
};

startServer().catch((error: Error) => {
  console.error(`Error starting server: ${error.message}`);

  process.exit(1);
});
