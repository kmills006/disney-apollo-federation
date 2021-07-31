import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

const gateway = new ApolloGateway({
  experimental_pollInterval: 10000,
  serviceList: [
    { name: 'attractions', url: 'http://localhost:4001' },
    { name: 'parks', url: 'http://localhost:4002' },
  ],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server
  .listen()
  .then(({ url }) => console.log(`Apollo Gateway ready at ${url}.`));
