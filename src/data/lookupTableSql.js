import database from './root';

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
