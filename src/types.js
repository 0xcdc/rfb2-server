import { buildSchema } from 'graphql';

export const typeDefs = buildSchema(`
  type City {
    id: Int!
    name: String!
    break_out: Int!
    in_king_county: Int!
    location: Location!
  }

  type Client{
    id: Int!
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
    phoneNumber: String!
    note: String!
  },

  type ClientVisit {
    age: Int
    birthYear: String!
    clientId: Int!
    date: String!,
    disabled: Int!
    ethnicityId: Int!
    genderId: Int!
    militaryStatusId: Int!
    raceId: Int!
    refugeeImmigrantStatus: Int!
    speaksEnglish: Int!
  }

  type Credentials {
    googleMapsApiKey: String!
  }

  type Location {
    lat: Float!
    lng: Float!
  }

  type Household {
    id: Int!
    address1: String!
    address2: String!
    cityId: Int!
    zip: String!
    incomeLevelId: Int!
    note: String!
    clients: [Client]
    city: City!
    location: Location
    lastVisit: String
  }

  type HouseholdVisit {
    cityId: Int!
    date: String!
    homeless: Int!
    householdId: Int!
    incomeLevelId: Int!
    visitId: Int!
    zip: String!
    clients: [ClientVisit]
  }

  type Language {
    id: Int!
    name: String!
    code: String!
  }

  type LookupTable {
    id: Int!
    value: String!
  }

  type Translation {
    set: String!
    tag: String!
    id: Int!
    languageId: Int!
    value: String!
  }

  type Visit {
    id: Int!
    householdId: Int!
    date: String!
  }

  type Query {
    cities: [City],
    credentials: Credentials,
    ethnicities: [LookupTable],
    genders: [LookupTable],
    googleTranslate(value: String!, code: String!): String,
    household(id: Int!, date: String): Household,
    households(ids: [Int!]!): [Household],
    householdVisitsForYear(year: Int!): [HouseholdVisit],
    incomeLevels: [LookupTable],
    languages: [Language],
    militaryStatuses: [LookupTable],
    races: [LookupTable],
    translationSets: [String],
    translations: [Translation],
    visitsForHousehold(householdId: Int!): [Visit],
    yesNos: [LookupTable],
   }

  input ClientInput {
      id: Int!
      name: String!
      disabled: Int!
      raceId: Int!
      birthYear: String!
      genderId: Int!
      refugeeImmigrantStatus: Int!
      speaksEnglish: Int!
      militaryStatusId: Int!
      ethnicityId: Int!
      phoneNumber: String!
  }

  input LocationInput {
    lat: Float!
    lng: Float!
  }

  input HouseholdInput {
    id: Int!
    address1: String!
    address2: String!
    cityId: Int!
    zip: String!
    incomeLevelId: Int!
    location: LocationInput
    note: String!
    clients: [ClientInput]!
  }

  type Mutation {
    deleteClient(id: Int!): Client,
    deleteVisit(id: Int!): Visit,
    pullNextKey(entity: String!): Int,
    recordVisit(householdId: Int!, year: Int, month: Int, day: Int): Visit,
    updateHousehold(household: HouseholdInput!, inPlace: Boolean): Household
    updateTranslation(set: String!, id: Int!, languageId: Int!, value: String!): Translation
  }
`);
