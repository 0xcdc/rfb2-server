import { loadAllCities, loadCityById } from './citySql';
import { loadAllClients, loadClientsForHouseholdId } from './clientSql';
import database from './root';
import { incrementHouseholdVersion } from './increment';
import { recordVisit } from './visitSql';

function selectById({ id, version }) {
  version = version ? new Promise(version) : database.getMaxVersion('household', id);
  const sql = `
    select *
    from household
    where household.id = :id
      and version = :version`;
  return version
    .then( version => database.all(sql, { id, version }))
    .then( rows => rows?.[0]);
}

function loadById({ id, version }) {
  return selectById({ id, version })
    .then( household => {
      if ( household ) {
        return loadCityById(household.cityId)
          .then( city => household.city = city)
          .then( () => loadClientsForHouseholdId(id, household.version))
          .then( clients => {
            household.clients = clients;
            household.householdSize = clients.length;
          })
          .then( () => household);
      } else {
        return null;
      }
    });
}

export function loadAllHouseholds(ids) {
  const households = database.all(
    `
    select *
    from household h
    where not exists (
      select 1
      from household h2
      where h.id = h2.id
        and h2.version > h.version)`,
  );
  const clients = loadAllClients();
  const cities = loadAllCities();

  return Promise.all([households, clients, cities])
    .then( ([households, clients, cities]) => {
      const citiesMap = new Map(cities.map(city => [city.id, city]));
      const householdMap = new Map(
        households.map(h => [h.id, { ...h, city: citiesMap.get(h.cityId) }]),
      );

      clients.forEach(client => {
        const household = householdMap.get(client.householdId);
        if (!household.clients) household.clients = [];
        household.clients.push(client);
        household.householdSize = household.clients.length;
      });
      if (ids.length === 0) {
        return Array.from(householdMap.values());
      } else {
        return Array.from(ids.map(id => householdMap.get(id)));
      }
    });
}

export function loadHouseholdById(id, version) {
  return loadById({ id, version });
}
/*
const saveHouseholdTransaction = database.transaction(household => {
  if (household.id === -1) {
    database.upsert('household', household, { isVersioned: true });
    recordVisit(household.id);
  } else {
    household.version = incrementHouseholdVersion(household.id);
    database.update('household', household);
  }
});
*/
export function updateHousehold(household) {
  saveHouseholdTransaction(household);
  return loadById(household);
}
