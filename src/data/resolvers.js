import { loadAllCities, loadCityById } from './citySql';
import { loadAllClients, loadClientById, updateClient, deleteClient } from './clientSql';


export const resolvers = {
  Query: {
    cities: () => loadAllCities(),
    city: (parent, args, context, info) => loadCityById(args.id),
    clients: () => loadAllClients(),
    client: (parent, args, context, info) => loadClientById(args.id),
  },
  Mutation: {
    updateClient: (parent, args, context, info) => updateClient(args.client),
    deleteClient: (parent, args, context, info) => deleteClient(args.id),
  }
};
