import { deleteClient, loadAllClients, loadClientById, updateClient } from './clientSql.js';
import {
  deleteVisit, firstVisitsForYear, loadClientVisits, loadHouseholdVisits, recordVisit, visitsForHousehold,
  visitsForMonth
} from './visitSql.js';
import { loadAllCities, loadCityById } from './citySql.js';
import { loadAllHouseholds, loadHouseholdById, updateHousehold } from './householdSql.js';
import { loadAllLanguages, loadAllPrompts, loadAllTranslations, loadTranslationTables, updatePrompt }
  from './translationSql.js';
import { credentials } from '../credentials.js';
import { lookupSet } from './lookupTableSql.js';

export const resolvers = {
  // Query:
  cities: args => loadAllCities(),
  city: args => loadCityById(args.id),
  client: args => loadClientById(args.id),
  clients: args => loadAllClients(),
  clientVisitsForYear: args => loadClientVisits(args.year),
  credentials: args => ({ googleMapsApiKey: credentials.googleMapsApiKey }),
  ethnicities: args => lookupSet('ethnicity'),
  ethnicity: args => lookupSet('ethnicity', args.id),
  firstVisitsForYear: args => firstVisitsForYear(args.year),
  gender: args => lookupSet('gender', args.id),
  genders: args => lookupSet('gender'),
  household: args => loadHouseholdById(args.id, args.version),
  households: args => loadAllHouseholds(args.ids),
  householdVisitsForYear: args => loadHouseholdVisits(args.year),
  incomeLevel: args => lookupSet('income_level', args.id),
  incomeLevels: args => lookupSet('income_level'),
  languages: args => loadAllLanguages(),
  militaryStatus: args => lookupSet('militaryStatus', args.id),
  militaryStatuses: args => lookupSet('militaryStatus'),
  prompts: args => loadAllPrompts(),
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
  recordVisit: args => recordVisit(args),
  updateClient: args => updateClient(args),
  updateHousehold: args => updateHousehold(args),
  updatePrompt: args => updatePrompt(args),
};
