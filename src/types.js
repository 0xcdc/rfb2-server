import { buildSchema } from 'graphql';

export const typeDefs = buildSchema(`
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

  type Household {
    id: Int!
    version: Int!
    address1: String!
    address2: String!
    cityId: Int!
    zip: String!
    incomeLevelId: Int!
    householdSize: Int!
    note: String!
    clients: [Client]
    city: City!
  }

  type LookupTable {
    id: Int!
    value: String!
  }

  type Visit {
    id: Int!
    householdId: Int!
    householdVersion: Int!
    date: String!
  }

  type Query {
    city(id: Int!): City,
    cities: [City],
    client(id: Int!): Client,
    clients: [Client],
    household(id: Int!, version: Int): Household,
    households(ids: [Int!]!): [Household],
    ethnicities: [LookupTable],
    ethnicity(id: Int!): LookupTable,
    firstVisitsForYear(year: Int!): [Visit],
    gender(id: Int!): LookupTable,
    genders: [LookupTable],
    incomeLevel(id: Int!): LookupTable,
    incomeLevels: [LookupTable],
    militaryStatus(id: Int!): LookupTable,
    militaryStatuses: [LookupTable],
    race(id: Int!): LookupTable,
    races: [LookupTable],
    visitsForHousehold(householdId: Int!): [Visit],
    visitsForMonth(year: Int!, month: Int!): [Visit],
    yesNo(id: Int!): LookupTable,
    yesNos: [LookupTable],
   }

  input ClientInput {
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
  }

  input HouseholdInput {
    id: Int!
    address1: String!
    address2: String!
    cityId: Int!
    zip: String!
    incomeLevelId: Int!
    note: String!
  }

  type Mutation {
    deleteClient(id: Int!): Client,
    deleteVisit(id: Int!): Visit,
    recordVisit(householdId: Int!, year: Int!, month: Int!, day: Int!): Visit,
    updateClient(client: ClientInput!): Client,
    updateHousehold(household: HouseholdInput!): Household
  }
`);
