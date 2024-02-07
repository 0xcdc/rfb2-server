import { DateTime } from 'luxon';
import database from './database.js';

const selectSql = `SELECT id, householdId, cast(date as char) as date`;

function selectVisits(filters) {
  const filterSql = !filters ? '' : `
WHERE ` +
    Object
      .keys(filters)
      .map( key => `${key} = :${key}`).
      join('\n  AND');

  return database.all(`
${selectSql}
FROM visit
${filterSql} `,
  filters
  );
}

export function visitsForHousehold(householdId) {
  return selectVisits({ householdId });
}

export function firstVisitsForYear(year) {
  const firstDay = DateTime.fromObject({ year, month: 1, day: 1 }).toISODate();
  const lastDay = DateTime.fromObject({ year: year + 1, month: 1, day: 1 }).toISODate();

  const sql = `
     ${selectSql}
     FROM visit v
     WHERE v.date >= :firstDay
       AND v.date < :lastDay
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
    `${selectSql}
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
    await conn.execute(`
      INSERT INTO visit (id, date, householdId)
        SELECT :id, :date, :householdId
        WHERE NOT EXISTS (
          SELECT *
          FROM visit
          WHERE date = :date
            AND householdId = :householdId
       )`, { date, id, householdId });
    const rows = await conn.all(`
      ${selectSql}
        FROM visit
        WHERE date = :date
          AND householdId = :householdId`, { date, householdId });
    return rows[0];
  }
}

export function deleteVisit(id) {
  return selectVisits({ id })
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
    `${selectSql}
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
    `${selectSql}
     FROM household_visit
     WHERE date >= :firstDay and date <= :lastDay
     ORDER BY date`,
    { firstDay, lastDay }
  );
}
