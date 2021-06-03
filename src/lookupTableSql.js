import database from './root';

function lookupItem(tableName, id) {
  const rows = database.all(
    `
SELECT *
FROM ${tableName}
where id = :id`,
    { id },
  );

  return rows[0];
}

export function lookupSet(tableName, id) {
  if (id || id === 0) {
    return lookupItem(tableName, id);
  }

  const rows = database.all(
    `
SELECT *
FROM ${tableName}
ORDER BY id`,
  );

  return rows;
}
