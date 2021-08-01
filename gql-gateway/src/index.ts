import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

const ATTRACTIONS_SERVICE_URL =
  process.env.ATTRACTIONS_SERVICE_URL || 'http://localhost:4001';
const PARKS_SERVICE_URL =
  process.env.PARKS_SERVICE_URL || 'http://localhost:4002';

const main = async () => {
  const gateway = new ApolloGateway({
    experimental_pollInterval: 10000,
    serviceList: [
      { name: 'attractions', url: ATTRACTIONS_SERVICE_URL },
      { name: 'parks', url: PARKS_SERVICE_URL },
    ],
  });
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({
    schema,
    executor,
  });

  const { url } = await server.listen();
  console.log(`Apollo Gateway ready at ${url}.`);
};

main();
