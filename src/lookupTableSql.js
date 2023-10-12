import database from './database.js';

function lookupItem(tableName, id) {
  return database.all(
    `
SELECT *
FROM ${tableName}
where id = :id`,
    { id }
  ).then( rows => rows?.[0]);
}

export function lookupSet(tableName, id) {
  if (id || id === 0) {
    return lookupItem(tableName, id);
  }

  return database.all(
    `
SELECT *
FROM ${tableName}
ORDER BY id`
  );
}
