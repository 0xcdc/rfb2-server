import { deleteVisit, loadHouseholdVisits, recordVisit, visitsForHousehold } from './visitSql.js';
import { loadAllHouseholds, loadHouseholdById, updateHousehold } from './householdSql.js';
import { loadAllLanguages, loadAllTranslations, loadTranslationTables, updateTranslation } from './translationSql.js';
import { credentials } from '../credentials.js';
import database from './database.js';
import { googleTranslate } from './googleTranslate.js';
import { loadAllCities } from './citySql.js';
import { lookupSet } from './lookupTableSql.js';

export const resolvers = {
  // Query:
  cities: args => loadAllCities(),
  credentials: args => ({ googleMapsApiKey: credentials.googleMapsApiKey }),
  ethnicities: args => lookupSet('ethnicity'),
  genders: args => lookupSet('gender'),
  googleTranslate: args => googleTranslate(args),
  household: args => loadHouseholdById(args.id, args.date),
  households: args => loadAllHouseholds(args.ids),
  householdVisitsForYear: args => loadHouseholdVisits(args.year),
  incomeLevels: args => lookupSet('income_level'),
  languages: args => loadAllLanguages(),
  militaryStatuses: args => lookupSet('militaryStatus'),
  races: args => lookupSet('race'),
  translationSets: args => loadTranslationTables(),
  translations: args => loadAllTranslations(),
  visitsForHousehold: args => visitsForHousehold(args.householdId),
  yesNos: args => lookupSet('yes_no'),
  // Mutations:
  deleteVisit: args => deleteVisit(args.id),
  pullNextKey: args => database.pullNextKey(args.entity),
  recordVisit: args => recordVisit(args),
  updateHousehold: args => updateHousehold(args),
  updateTranslation: args => updateTranslation(args),
};
