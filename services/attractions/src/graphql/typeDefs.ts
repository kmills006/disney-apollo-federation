import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    attractions: [Attraction!]
  }

  type Attraction @key(fields: "permalink") {
    name: String!
    permalink: String!
    detail: AttractionDetail!
    park: Park
  }

  type AttractionDetail {
    assistiveListening: Boolean!
    audioDescription: Boolean!
    categoryCode: String!
    climateControlled: Boolean!
    crazyThreshold: Int
    duration: Int,
    fastpassBooth: Boolean!
    fastpassOnly: Boolean!
    frightening: Boolean!
    handheldCaptioning: Boolean!
    heightRestriction: String
    latitude: String!
    longitude: String!
    matchName: String!
    name: String!
    noServiceAnimals: Boolean!
    notToBeMissed: Boolean!
    openEmhEvening: Boolean!
    openEmhMorning: Boolean!
    openNotSoScary: Boolean!
    openVeryMerry: Boolean!
    openedOn: String!
    operationalNotes: String
    operatorType: String!
    riderSwap: Boolean!
    seasonal: Boolean!
    signLanguage: Boolean!
    singleRider: Boolean!
    whatItIs: String!
    whenToGo: String
  }

  extend type Park @key(fields: "permalink") {
    permalink: String! @external
    attractions: [Attraction!]
  }
`;
