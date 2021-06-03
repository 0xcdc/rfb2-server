import { deleteClient, loadAllClients, loadClientById, updateClient } from './clientSql';
import { deleteVisit, firstVisitsForYear, recordVisit, visitsForHousehold, visitsForMonth } from './visitSql';
import { loadAllCities, loadCityById } from './citySql';
import { loadAllHouseholds, loadHouseholdById, updateHousehold } from './householdSql';
import { lookupSet } from './lookupTableSql';
import { pullNextKey } from './root';

export const resolvers = {
  Query: {
    cities: (parent, args, context, info) => loadAllCities(),
    city: (parent, args, context, info) => loadCityById(args.id),
    client: (parent, args, context, info) => loadClientById(args.id),
    clients: (parent, args, context, info) => loadAllClients(),
    ethnicities: (parent, args, context, info) => lookupSet('ethnicity'),
    ethnicity: (parent, args, context, info) => lookupSet('ethnicity', args.id),
    firstVisitsForYear: (parent, args, context, info) => firstVisitsForYear(args.year),
    gender: (parent, args, context, info) => lookupSet('gender', args.id),
    genders: (parent, args, context, info) => lookupSet('gender'),
    household: (parent, args, context, info) => loadHouseholdById(args.id, args.version),
    households: (parent, args, context, info) => loadAllHouseholds(args.ids),
    incomeLevel: (parent, args, context, info) => lookupSet('income_level', args.id),
    incomeLevels: (parent, args, context, info) => lookupSet('income_level'),
    militaryStatus: (parent, args, context, info) => lookupSet('militaryStatus', args.id),
    militaryStatuses: (parent, args, context, info) => lookupSet('militaryStatus'),
    race: (parent, args, context, info) => lookupSet('race', args.id),
    races: (parent, args, context, info) => lookupSet('race'),
    visitsForHousehold: (parent, args, context, info) => visitsForHousehold(args.householdId),
    visitsForMonth: (parent, args, context, info) => visitsForMonth(args.year, args.month),
    yesNo: (parent, args, context, info) => lookupSet('yes_no', args.id),
    yesNos: (parent, args, context, info) => lookupSet('yes_no'),
  },
  Mutation: {
    deleteClient: (parent, args, context, info) => deleteClient(args.id),
    deleteVisit: (parent, args, context, info) => deleteVisit(args.id),
    nextKey: (parent, args, context, info) => pullNextKey(args.tableName),
    recordVisit: (parent, args, context, info) => recordVisit(args.householdId, args.year, args.month, args.day),
    updateClient: (parent, args, context, info) => updateClient(args.client),
    updateHousehold: (parent, args, context, info) => updateHousehold(args.household),
  },
};
