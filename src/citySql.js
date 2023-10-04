import database from './database.js';

export function loadAllCities() {
  return database.all(
    `
SELECT *
FROM city
ORDER BY name`
  );
}

export function loadCityById(id) {
  return database.all(
    `
SELECT *
FROM city
where id = :id`,
    { id }
  ).then( rows => rows[0]);
}


