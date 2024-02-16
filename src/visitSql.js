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

export async function loadHouseholdVisits(year) {
  const firstDay = DateTime.fromObject({ year, month: 1, day: 1 }).toISODate();
  const lastDay = DateTime.fromObject({ year, month: 12, day: 31 }).toISODate();
  const sql = `
select *
  from household_visit
  where date >= :firstDay
    and date <= :lastDay
  order by date
`;

  const householdVisits = await database.all(sql, { firstDay, lastDay });

  // we need to augment homeless and age
  return householdVisits
    .map( hv => {
      const { householdId, data, visitId, date } = hv;
      const { clients, ...householdData } = data;

      const homeless = householdData.address1 == '' ? 1 : 0;

      clients.forEach( c => {
        const birthYear = parseInt(c.birthYear, 10);
        const visitYear = DateTime.fromISO(date).year;

        const age =
          isNaN(birthYear) ||
          birthYear < 1900 ||
          birthYear > visitYear ?
            null :
            visitYear - birthYear;

        c.age = age;
        c.clientId = c.id;
      });

      return {
        householdId,
        visitId,
        date,
        clients,
        ...householdData,
        homeless,
      };
    });
}
