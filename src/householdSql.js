import database from './database.js';
import { loadAllCities } from './citySql.js';

export function incrementHouseholdVersion(conn, householdId) {
  return conn.execute(
    `
    insert into household (id, version, address1, address2, cityId, zip, note, incomeLevelId, latlng)
      select id, version+1, address1, address2, cityId, zip, note, incomeLevelId, latlng
      from household
      where household.id = :householdId
        and not exists (
          select 1
          from household h2
          where household.id = h2.id
            and h2.version > household.version
        )`,
    { householdId })
    .then( () => conn.getMaxVersion('household', householdId))
    .then( householdVersion =>
      conn.execute(

        `
        insert into household_client_list (householdId, householdVersion, clientId, clientVersion)
          select householdId, :householdVersion, clientId, clientVersion
            from household_client_list
            where householdId = :householdId
              and householdVersion = :householdVersion - 1`,
        { householdVersion, householdId })
        .then( () => householdVersion)
    );
}


async function selectHouseholds({ id, date }) {
  date = date ? date : '9999-12-31';
  const idSql = !id ? '' : `
  and id = :id`;

  const householdPromise = database.all( `
select h.*, coalesce(last_visit, '') as lastVisit
from household h
left join (
  select householdId, max(date) as last_visit
  from visit
  group by householdId
) as v
  on v.householdId = h.id
where end_date = :date
  ${idSql}
`, { id, date }
  );

  const citiesPromise = loadAllCities();
  const [households, cities] = await Promise.all([householdPromise, citiesPromise]);
  const citiesMap = new Map(cities.map(city => [city.id, city]));
  return households.map(h => {
    const { data, ...householdFields } = h;
    return {
      ...householdFields,
      householdSize: data.clients.length,
      city: citiesMap.get(data.cityId),
      ...data,
    };
  });
}

export async function loadAllHouseholds(ids) {
  const households = await selectHouseholds({});
  if (ids.length == 0) return households;

  const householdMap = new Map(
    households.map( h => [h.id, h])
  );

  return Array.from(ids.map( id => householdMap.get(id)));
}

export async function loadHouseholdById(id, date) {
  const households = await selectHouseholds({ id, date });
  return households?.[0];
}

/*
export function updateClient({ client, inPlace }) {
  if(client.id === -1) {
    throw new Error('client.id cannot be -1');
  }

  let dbOp = null;
  if (isNewClient || !inPlace) {
    dbOp = database.transaction( conn =>
      (inPlace !== true ?
        incrementHouseholdVersion(conn, client.householdId) :
        conn.getMaxVersion('household', client.householdId))
        .then( householdVersion =>
          conn.upsert('client', client, { isVersioned: true, pullKey: true })
            .then( () =>
              (isNewClient) ?
                conn.execute(
                  `
                  insert into household_client_list (householdId, householdVersion, clientId, clientVersion)
                    values( :householdId, :householdVersion, :id, :version)`,
                  { ...client, householdVersion }
                ) : conn.execute(
                  `
                  update household_client_list
                    set clientVersion = :version
                    where householdId = :householdId
                      and householdVersion = :householdVersion
                      and clientId = :id`,
                  { ...client, householdVersion }
                )
            )
        )
    );
  } else {
    dbOp = database.transaction( conn => {
      return conn.getMaxVersion('client', client.id)
        .then( nextVersion => {
          client.version = nextVersion;
          const { id, version, ...values } = client;
          return conn.update('client', { id, version }, values);
        });
    });
  }
  return dbOp.then( () => loadClientById(client.id));
}
*/

export function updateHousehold({ householdInput }) {
  throw new Error('not implemented');
/*  const {clients, ...household} = householdInput;
  if(clients.length == 0) throw new Error('there must be at least one client');
  if(clients.some( c => c.name == '')) throw new Error('every client must have a name');

  if((household.id == -1) || (clients.some(c => c.id == -1))) {
    throw new Error('-1 is not a valid household / client id');
  }

  return database.transaction(conn => {
    // we are either going to update in place or insert a new version based on whether the
    // household has any visits in the past or not.

    conn.all(`select 1 from

    if (household.id === -1) {
      return conn.upsert('household', household, { isVersioned: true, pullKey: true });
    } else {
      const dbOp = inPlace ?
        conn.getMaxVersion('household', household.id) :
        incrementHouseholdVersion(conn, household.id);

      return dbOp.then( nextVersion => {
        household.version = nextVersion;
        const { id, version, ...values } = household;
        return conn.update('household', { id, version }, values);
      });
    }
  }).then( () => loadById(household));
  */
}
