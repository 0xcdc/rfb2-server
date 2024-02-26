import database, { whereClause } from './database.js';
import { DateTime } from 'luxon';

const selectSql = `SELECT id, householdId, cast(date as char) as date`;

function selectVisits(filters) {
  return database.all(`
${selectSql}
FROM visit
${whereClause(filters)} `,
  filters
  );
}

export function visitsForHousehold(householdId) {
  return selectVisits({ householdId });
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
      const sql = `
delete
  from visit
  where id = :id`;
      return database.execute(sql, { id })
        .then( () => rows[0]);
    });
}

export async function loadVisits(year) {
  const params = {};
  let sql = `
${selectSql}
from visit v`;
  if (year) {
    params.firstDay = DateTime.fromObject({ year, month: 1, day: 1 }).toISODate();
    params.lastDay = DateTime.fromObject({ year, month: 12, day: 31 }).toISODate();

    sql += `
  where date >= :firstDay
    and date <= :lastDay `;
  }
  sql += `
  order by date `;
  return database.all(sql, params);
}
