import {
  createNewClient, createNewHousehold,
  loadAllHouseholds, loadHouseholdById, loadHouseholdHistory,
  updateHousehold } from './householdSql.js';
import { deleteVisit, loadVisits, recordVisit, visitsForHousehold } from './visitSql.js';
import { loadAllLanguages, loadAllTranslations, loadTranslationTables, updateTranslation } from './translationSql.js';
import { credentials } from '../credentials.js';
import database from './database.js';
import { googleTranslate } from './googleTranslate.js';
import { loadAllCities } from './citySql.js';
import { lookupSet } from './lookupTableSql.js';

export const resolvers = {
  // Query:
  allVisits: args => loadVisits(),
  cities: args => loadAllCities(),
  credentials: args => ({ googleMapsApiKey: credentials.google.mapsApiKey }),
  ethnicities: args => lookupSet('ethnicity'),
  genders: args => lookupSet('gender'),
  googleTranslate: args => googleTranslate(args),
  historicalHouseholds: args => loadHouseholdHistory(args),
  household: args => loadHouseholdById(args.id, args.date),
  households: args => loadAllHouseholds(args.ids),
  visitsForYear: args => loadVisits(args.year),
  incomeLevels: args => lookupSet('income_level'),
  languages: args => loadAllLanguages(),
  militaryStatuses: args => lookupSet('militaryStatus'),
  races: args => lookupSet('race'),
  translationSets: args => loadTranslationTables(),
  translations: args => loadAllTranslations(),
  visitsForHousehold: args => visitsForHousehold(args.householdId),
  yesNos: args => lookupSet('yes_no'),
  // Mutations:
  createNewHousehold: args => createNewHousehold(),
  createNewClient: args => createNewClient(),
  deleteVisit: args => deleteVisit(args.id),
  pullNextKey: args => database.pullNextKey(args.entity),
  recordVisit: args => recordVisit(args),
  updateHousehold: args => updateHousehold(args),
  updateTranslation: args => updateTranslation(args),
};
