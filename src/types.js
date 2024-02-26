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
    phoneNumber: String!
    note: String!
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
    startDate: String!
    endDate: String!
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
    allVisits: [Visit]
    cities: [City]
    credentials: Credentials
    ethnicities: [LookupTable]
    genders: [LookupTable]
    googleTranslate(value: String!, code: String!): String
    historicalHouseholds: [Household]
    household(id: Int!, date: String): Household
    households(ids: [Int!]!): [Household]
    visitsForYear(year: Int!): [Visit]
    incomeLevels: [LookupTable]
    languages: [Language]
    militaryStatuses: [LookupTable]
    races: [LookupTable]
    translationSets: [String]
    translations: [Translation]
    visitsForHousehold(householdId: Int!): [Visit]
    yesNos: [LookupTable]
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

  input UpdateTranslationInput {
    set: String!
    id: Int!
    languageId: Int!
    value: String!
  }

  type Mutation {
    createNewHousehold: Household
    createNewClient: Client
    deleteVisit(id: Int!): Visit
    pullNextKey(entity: String!): Int
    recordVisit(householdId: Int!, year: Int, month: Int, day: Int): Visit
    updateHousehold(household: HouseholdInput!): Household
    updateTranslation(translation: UpdateTranslationInput): Translation
  }
`);
