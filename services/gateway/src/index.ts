import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server';

const gateway = new ApolloGateway({
  experimental_pollInterval: 10000,
  serviceList: [
    { name: 'parks', url: 'http://localhost:4000' },
    { name: 'attractions', url: 'http://localhost:4001' },
  ],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen({ port: 3000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
