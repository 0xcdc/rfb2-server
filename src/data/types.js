import { gql } from 'apollo-server';

export const typeDefs = gql`
  type City {
    id: Int!
    name: String!
    break_out: Int!
    in_king_county: Int!
  }

  type Client{
    id: Int!
    householdId: Int!
    name: String!
    disabled: Int!
    raceId: Int!
    birthYear: String!
    genderId: Int!
    refugeeImmigrantStatus: Int!
    speaksEnglish: Int!
    militaryStatusId: Int!
    ethnicityId: Int!
    householdSize: Int!
    cardColor: String!
    lastVisit: String
    note: String
  },

  type Query {
    city(id: Int!): City,
    cities: [City],
    client(id: Int!): Client,
    clients: [Client],
  }

  input ClientInput {
      id: Int!
      householdId: Int!
      name: Stringi!
      disabled: Int!
      raceId: Int!
      birthYear: String!
      genderId: Int!
      refugeeImmigrantStatus: Int!
      speaksEnglish: Int!
      militaryStatusId: Int!
      ethnicityId: Int!
      householdSize: Int!
      cardColor: String!
      lastVisit: String!
      note: String!
  }

  type Mutation {
    updateClient(client: ClientInput): Client,
    deleteClient(id: Int!): Client,
  }
`;
