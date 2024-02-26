import database, { whereClause } from './database.js';
import { DateTime } from 'luxon';
import { loadAllCities } from './citySql.js';

export async function createNewHousehold() {
  const id = await database.pullNextKey('household');
  return {
    id,
    address1: '',
    address2: '',
    cityId: 0,
    zip: '',
    incomeLevelId: 0,
    note: '',
    clients: [],
    location: null,
  };
}

export async function createNewClient() {
  const id = await database.pullNextKey('client');
  return {
    id,
    name: '',
    disabled: -1,
    raceId: 0,
    birthYear: '',
    genderId: 0,
    refugeeImmigrantStatus: -1,
    speaksEnglish: -1,
    militaryStatusId: 0,
    ethnicityId: 0,
    phoneNumber: '',
  };
}

async function selectHouseholds(whereFilters) {
  const householdPromise = database.all( `
select h.*,
  cast(h.start_date as char) as startDate, cast(h.end_date as char) as endDate,
  coalesce(cast(last_visit as char), '') as lastVisit
from household h
left join (
  select householdId, max(date) as last_visit
  from visit
  group by householdId
) as v
  on v.householdId = h.id
${whereClause(whereFilters)}
`, whereFilters
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
  const households = await selectHouseholds({ end_date: '9999-12-31' });
  if (ids.length == 0) return households;

  const householdMap = new Map(
    households.map( h => [h.id, h])
  );

  return Array.from(ids.map( id => householdMap.get(id)));
}

export async function loadHouseholdById(id, date) {
  date ??= '9999-12-31';
  const households = await selectHouseholds({ id, end_date: date });
  return households?.[0];
}

export async function updateHousehold({ household }) {
  const { id, ...data } = household;
  if (data.clients.length == 0) throw new Error('there must be at least one client');
  if (data.clients.some( c => c.name == '')) throw new Error('every client must have a name');

  if ((id == -1) || (data.clients.some(c => c.id == -1))) {
    throw new Error('-1 is not a valid household / client id');
  }

  await database.transaction(async conn => {
    // we handle versioning by start_date / end_date
    // we'll upsert the new data as start_date = today and end_date = 12/31/9999
    // but first, if there is an existing row with end_date=12/31/9999
    // we'll need to set it's end_date = today
    // UNLESS that row's start date is today
    // (i.e. we've already updated the client today so we can update "inplace")

    const today = DateTime.now().setZone('America/Los_Angeles').toISODate();
    const sentinal = '9999-12-31';

    const closeExistingRecordSql = `
update household
  set end_date = :today
  where id = :id
    and start_date <> :today
    and end_date = :sentinal`;

    await conn.execute(closeExistingRecordSql, { id, today, sentinal });

    await conn.upsert('household', { id, start_date: today, end_date: sentinal, data });
  });

  return loadHouseholdById(id);
}


export async function loadHouseholdHistory() {
  return selectHouseholds();
}
