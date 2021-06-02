import { loadAllCities, loadCityById } from './citySql';
import { loadAllClients, loadClientById, updateClient, deleteClient } from './clientSql';
import { loadAllHouseholds, loadHouseholdById, updateHousehold } from './householdSql';
import { lookupSet } from './lookupTableSql';
import { firstVisitsForYear, visitsForHousehold, visitsForMonth } from './visitSql';

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
    updateClient: (parent, args, context, info) => updateClient(args.client),
    deleteClient: (parent, args, context, info) => deleteClient(args.id),
    updateHousehold: (parent, args, context, info) => updateHousehold(args.household),
  }
};
