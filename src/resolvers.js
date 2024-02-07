import { deleteClient, loadAllClients, loadClientById } from './clientSql.js';
import {
  deleteVisit, firstVisitsForYear, loadClientVisits, loadHouseholdVisits, recordVisit, visitsForHousehold,
  visitsForMonth
} from './visitSql.js';
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
  client: args => loadClientById(args.id),
  clients: args => loadAllClients(),
  clientVisitsForYear: args => loadClientVisits(args.year),
  credentials: args => ({ googleMapsApiKey: credentials.googleMapsApiKey }),
  ethnicities: args => lookupSet('ethnicity'),
  ethnicity: args => lookupSet('ethnicity', args.id),
  firstVisitsForYear: args => firstVisitsForYear(args.year),
  gender: args => lookupSet('gender', args.id),
  genders: args => lookupSet('gender'),
  googleTranslate: args => googleTranslate(args),
  household: args => loadHouseholdById(args.id, args.date),
  households: args => loadAllHouseholds(args.ids),
  householdVisitsForYear: args => loadHouseholdVisits(args.year),
  incomeLevel: args => lookupSet('income_level', args.id),
  incomeLevels: args => lookupSet('income_level'),
  languages: args => loadAllLanguages(),
  militaryStatus: args => lookupSet('militaryStatus', args.id),
  militaryStatuses: args => lookupSet('militaryStatus'),
  race: args => lookupSet('race', args.id),
  races: args => lookupSet('race'),
  translationSets: args => loadTranslationTables(),
  translations: args => loadAllTranslations(),
  visitsForHousehold: args => visitsForHousehold(args.householdId),
  visitsForMonth: args => visitsForMonth(args.year, args.month),
  yesNo: args => lookupSet('yes_no', args.id),
  yesNos: args => lookupSet('yes_no'),
  // Mutations:
  deleteClient: args => deleteClient(args.id),
  deleteVisit: args => deleteVisit(args.id),
  pullNextKey: args => database.pullNextKey(args.entity),
  recordVisit: args => recordVisit(args),
  updateHousehold: args => updateHousehold(args),
  updateTranslation: args => updateTranslation(args),
};
