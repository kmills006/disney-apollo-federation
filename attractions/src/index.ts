import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer } from 'apollo-server';

import { PORT } from './config';
import { AttractionsApi } from './datasources/AttractionsApi';
import { ParksApi } from './datasources/ParksApi';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

console.log('resolvers', resolvers);

const startServer = async () => {
  const server = new ApolloServer({
    dataSources: () => ({
      attractionsApi: new AttractionsApi(),
      parksApi: new ParksApi() as any,
    }),
    schema: buildFederatedSchema([{
      resolvers,
      typeDefs,
    }] as any),
  });

  server.listen({ port: PORT }).then(({ url }: { url: string }) => {
    console.log(`🎢 Attractions service running at ${url}`);
  });
};

startServer().catch((error: Error) => {
  console.error(`Error starting server: ${error.message}`);

  process.exit(1);
});
