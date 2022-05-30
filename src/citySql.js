import database from './database';

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


