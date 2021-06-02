import database from './root';
import { loadAllClients, loadClientsForHouseholdId } from './clientSql';
import { loadCityById, loadAllCities } from './citySql';
import { recordVisit } from './visitSql';
import { incrementHouseholdVersion } from './increment';

function selectById({ id, version }) {
  const sql = `
    select *
    from household
    where household.id = :id
      and version = :version`;
  const household = database.all(sql, { id, version });

  return household;
}

function loadById({ id, version }) {
  const household = selectById({ id, version })[0];
  household.city = loadCityById(household.cityId);
  household.clients = loadClientsForHouseholdId(id, household.version);
  return household;
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
  if(ids.length === 0) {
    return Array.from(householdMap.values());
  } else {
    return Array.from(ids.map(id => householdMap.get(id)));
  }
}

export function loadHouseholdById(id, version) {
  const v = version || database.getMaxVersion('household', id);
  return loadById({ id, version: v });
}

const saveHouseholdTransaction = database.transaction(household => {
  if (household.id === -1) {
    database.upsert('household', household, { isVersioned: true });
    recordVisit(household.id);
  } else {
    household.version = incrementHouseholdVersion(household.id);
    database.update('household', household);
  }
})

export function updateHousehold(household) {
  saveHouseholdTransaction(household);
  return loadById(household);
}
