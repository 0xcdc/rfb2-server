import { deleteClient, loadAllClients, loadClientById, updateClient } from './clientSql';
import { deleteVisit, firstVisitsForYear, recordVisit, visitsForHousehold, visitsForMonth } from './visitSql';
import { loadAllCities, loadCityById } from './citySql';
import { loadAllHouseholds, loadHouseholdById, updateHousehold } from './householdSql';
import { lookupSet } from './lookupTableSql';
import { pullNextKey } from './root';

export const resolvers = {
  // Query:
  cities: args => loadAllCities(),
  city: args => loadCityById(args.id),
  client: args => loadClientById(args.id),
  clients: args => loadAllClients(),
  ethnicities: args => lookupSet('ethnicity'),
  ethnicity: args => lookupSet('ethnicity', args.id),
  firstVisitsForYear: args => firstVisitsForYear(args.year),
  gender: args => lookupSet('gender', args.id),
  genders: args => lookupSet('gender'),
  household: args => loadHouseholdById(args.id, args.version),
  households: args => loadAllHouseholds(args.ids),
  incomeLevel: args => lookupSet('income_level', args.id),
  incomeLevels: args => lookupSet('income_level'),
  militaryStatus: args => lookupSet('militaryStatus', args.id),
  militaryStatuses: args => lookupSet('militaryStatus'),
  race: args => lookupSet('race', args.id),
  races: args => lookupSet('race'),
  visitsForHousehold: args => visitsForHousehold(args.householdId),
  visitsForMonth: args => visitsForMonth(args.year, args.month),
  yesNo: args => lookupSet('yes_no', args.id),
  yesNos: args => lookupSet('yes_no'),
  // Mutations:
  deleteClient: args => deleteClient(args.id),
  deleteVisit: args => deleteVisit(args.id),
  nextKey: args => pullNextKey(args.tableName),
  recordVisit: args => recordVisit(args.householdId, args.year, args.month, args.day),
  updateClient: args => updateClient(args.client),
  updateHousehold: args => updateHousehold(args.household),
};
