import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer } from 'apollo-server';

import { PORT } from './config';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const startServer = async () => {
  const server = new ApolloServer({
    schema: buildFederatedSchema([{
      resolvers,
      typeDefs,
    }] as any),
  });

  server.listen({ port: PORT }).then(({ url }: { url: string }) => {
    console.log(`🅿️  Parks service running at ${url}`);
  });
};

startServer().catch((error: Error) => {
  console.error(`Error starting server: ${error.message}`);

  process.exit(1);
});
