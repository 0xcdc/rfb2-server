import { DateTime } from 'luxon';
import database from './database.js';

function selectVisitsForHousehold(householdId) {
  return database.all(
    `
    SELECT *
    FROM visit
    WHERE householdId = :householdId`,
    { householdId }
  );
}

function selectVisitById(id) {
  return database.all(
    `
    SELECT *
    FROM visit
    WHERE id = :id`,
    { id }
  );
}

export function visitsForHousehold(householdId) {
  return selectVisitsForHousehold(householdId);
}

export function firstVisitsForYear(year) {
  const firstDay = DateTime.fromObject({ year, month: 1, day: 1 }).toISODate();
  const lastDay = DateTime.fromObject({ year: year + 1, month: 1, day: 1 }).toISODate();

  const sql = `
     SELECT *
     FROM visit v1
     WHERE v1.date >= :firstDay
       AND v1.date < :lastDay
       AND NOT EXISTS (
         SELECT *
         FROM visit v2
         WHERE v2.date >= :firstDay
           AND v2.date < :lastDay
           AND v2.date < v1.date
           AND v2.householdId = v1.householdId
       )`;

  return database.all(sql, { firstDay, lastDay });
}

export function visitsForMonth(year, month) {
  const day = 1;
  let firstDay = DateTime.fromObject({ year, month, day });
  let lastDay = firstDay.plus({ months: 1 });

  [firstDay, lastDay] = [firstDay, lastDay].map( e => e.toISODate());

  return database.all(
    `SELECT *
     FROM visit
     WHERE date >= :firstDay and date < :lastDay`,
    { firstDay, lastDay }
  );
}

export async function recordVisit(args) {
  const { conn } = args;
  if (!conn) {
    return database.transaction( conn => recordVisit({ ...args, conn }));
  } else {
    const { householdId, year, month, day } = args;
    let date =null;
    if (year && month && day) {
      date = DateTime.fromObject({ year, month, day });
    } else {
      date = DateTime.now().setZone('America/Los_Angeles');
    }
    date = date.toISODate();

    const id = await conn.pullNextKey('visit');
    const householdVersion = await conn.getMaxVersion('household', householdId);
    await conn.execute(`
      INSERT INTO visit (id, date, householdId, householdVersion)
        SELECT :id, :date, :householdId, :householdVersion
        WHERE NOT EXISTS (
          SELECT *
          FROM visit
          WHERE date = :date
            AND householdId = :householdId
       )`, { date, id, householdId, householdVersion });
    const rows = await conn.all(`
      SELECT *
        FROM visit
        WHERE date = :date
          AND householdId = :householdId`, { date, householdId });
    return rows[0];
  }
}

export function deleteVisit(id) {
  return selectVisitById(id)
    .then( rows => {
      if (rows.length === 0) {
        throw new Error(`could not find a visit with id: ${id}`);
      }
      return database.delete('visit', { id })
        .then( () => rows[0]);
    });
}

export function loadClientVisits(year) {
  const firstDay = DateTime.fromObject({ year, month: 1, day: 1 }).toISODate();
  const lastDay = DateTime.fromObject({ year, month: 12, day: 31 }).toISODate();

  return database.all(
    `SELECT *
     FROM client_visit
     WHERE date >= :firstDay and date <= :lastDay
     ORDER BY date`,
    { firstDay, lastDay }
  );
}

export function loadHouseholdVisits(year) {
  const firstDay = DateTime.fromObject({ year, month: 1, day: 1 }).toISODate();
  const lastDay = DateTime.fromObject({ year, month: 12, day: 31 }).toISODate();

  return database.all(
    `SELECT *
     FROM household_visit
     WHERE date >= :firstDay and date <= :lastDay
     ORDER BY date`,
    { firstDay, lastDay }
  );
}
