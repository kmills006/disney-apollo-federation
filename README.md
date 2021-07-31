# disney-apollo-federation

Playground repo for implementing a single graph for the [Touring Plans API](https://touringplans.com/api)
in GraphQL. This originally started as a quick demo demonstrating [Apollo Federation](https://www.apollographql.com/docs/federation/)
and has now turned into a repo for me to learn new languages.

## Objective

- Build four GraphQL API's that are composed into a single graph for Touring Plans
  - Parks
  - Attractions
  - Dining
  - Hotels
- Build the backend in different languages
- Build a React frontend to display to query and display this data using Apollo Client

## Running

### Running the backend

#### Node

```
$ cd node
$ yarn install
$ yarn dev
```

### Running the frontend

TODO

### Running the Gateway (Apollo Gateway)

```
$ cd gql-gateway
$ yarn install
$ yarn dev
```

### Running With Docker (Services)
#### In Development:
```
$ docker compose build
$ docker compose up
$ cd gql-gateway
$ yarn install
$ yarn dev
```

### TODO

- [ ] Python backend
- [ ] Frontend
- [x] Docker Compose to run all the things
- [ ] Scala backend
- [ ] Node tests

### Original README

Demo GraphQL server connected to multiple GraphQL services using the new [Apollo Federation](https://blog.apollographql.com/apollo-federation-f260cf525d21) package
