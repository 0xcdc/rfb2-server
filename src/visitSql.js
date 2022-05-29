import database from './root';

function selectVisitsForHousehold(householdId) {
  return database.all(
    `
    SELECT *
    FROM visit
    WHERE householdId = :householdId`,
    { householdId },
  );
}

function selectVisitById(id) {
  return database.all(
    `
    SELECT *
    FROM visit
    WHERE id = :id`,
    { id },
  );
}

export function visitsForHousehold(householdId) {
  return selectVisitsForHousehold(householdId);
}

function formatDate(date) {
  const { year } = date;
  let { month, day } = date;
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;
  return `${year}-${month}-${day}`;
}

export function firstVisitsForYear(year) {
  const firstDay = formatDate({ year, month: 1, day: 1 });
  const lastDay = formatDate({ year: year + 1, month: 1, day: 1 });

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
  const firstDay = formatDate({ year, month, day: 1 });
  const lastDay = formatDate({ year, month: month + 1, day: 1 });

  return database.all(
    `SELECT *
     FROM visit
     WHERE date >= :firstDay and date < :lastDay`,
    { firstDay, lastDay },
  );
}

export function recordVisit(args) {
  const { conn } = args;
  if (!conn) {
    return database.transaction( conn => recordVisit({ ...args, conn }));
  } else {
    const { householdId, year, month, day } = args;
    let date = new Date();
    if (year && month && day) {
      date = { year, month, day };
    } else {
      date = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      };
    }
    date = formatDate(date);

    return conn.pullNextKey('visit')
      .then( id =>
        conn.getMaxVersion('household', householdId)
          .then( householdVersion => conn.insert('visit', { date, id, householdId, householdVersion }))
          .then( () => selectVisitById(id))
          .then( rows => rows[0])
      );
  }
}

export function deleteVisit(id) {
  const visit = selectVisitById(id);
  if (visit.length === 0) {
    throw new Error(`could not find a visit with id: ${id}`);
  }

  database.delete('visit', { id });

  return visit[0];
}
