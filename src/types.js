import { buildSchema } from 'graphql';

export const typeDefs = buildSchema(`
  type City {
    id: Int!
    name: String!
    break_out: Int!
    in_king_county: Int!
    latlng: String!
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
    phoneNumber: String!
    note: String!
  },

  type ClientVisit {
    age: Int
    birthYear: String!
    cityId: Int!
    clientId: Int!
    date: String!,
    disabled: Int!
    ethnicityId: Int!
    genderId: Int!
    householdId: Int!
    militaryStatusId: Int!
    raceId: Int!
    refugeeImmigrantStatus: Int!
    speaksEnglish: Int!
    visitId: Int!
    zip: String!,
  }

  type Credentials {
    googleMapsApiKey: String!
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
    latlng: String!
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
    householdVersion: Int!
    date: String!
  }

  type Query {
    city(id: Int!): City,
    cities: [City],
    client(id: Int!): Client,
    clientVisitsForYear(year: Int!): [ClientVisit],
    clients: [Client],
    credentials: Credentials,
    household(id: Int!, version: Int): Household,
    households(ids: [Int!]!): [Household],
    householdVisitsForYear(year: Int!): [HouseholdVisit],
    ethnicities: [LookupTable],
    ethnicity(id: Int!): LookupTable,
    firstVisitsForYear(year: Int!): [Visit],
    gender(id: Int!): LookupTable,
    genders: [LookupTable],
    googleTranslate(value: String!, code: String!): String,
    incomeLevel(id: Int!): LookupTable,
    incomeLevels: [LookupTable],
    languages: [Language],
    militaryStatus(id: Int!): LookupTable,
    militaryStatuses: [LookupTable],
    race(id: Int!): LookupTable,
    races: [LookupTable],
    translationSets: [String],
    translations: [Translation],
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
      phoneNumber: String!
  }

  input HouseholdInput {
    id: Int!
    address1: String!
    address2: String!
    cityId: Int!
    zip: String!
    incomeLevelId: Int!
    latlng: String!
    note: String!
  }

  type Mutation {
    deleteClient(id: Int!): Client,
    deleteVisit(id: Int!): Visit,
    pullNextKey(entity: String!): Int,
    recordVisit(householdId: Int!, year: Int, month: Int, day: Int): Visit,
    updateClient(client: ClientInput!, inPlace: Boolean): Client,
    updateHousehold(household: HouseholdInput!, inPlace: Boolean): Household
    updateTranslation(set: String!, id: Int!, languageId: Int!, value: String!): Translation
  }
`);
