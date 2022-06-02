import { loadAllCities, loadCityById } from './citySql';
import { loadAllClients, loadClientsForHouseholdId } from './clientSql';
import database from './database';
import { incrementHouseholdVersion } from './increment';

function selectById({ id, version }) {
  version = version ? Promise.resolve(version) : database.getMaxVersion('household', id);
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

export function updateHousehold(household) {
  return database.transaction(conn => {
    let dbOp = null;
    if (household.id === -1) {
      dbOp = conn.upsert('household', household, { isVersioned: true });
    } else {
      dbOp = incrementHouseholdVersion(conn, household.id)
        .then( version => {
          household.version = version;
          return conn.update('household', household);
        });
    }
    return dbOp;
  }).then( () => loadById(household));
}
