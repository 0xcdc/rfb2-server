import database from './database.js';

export function loadAllCities() {
  return database.all(
    `
SELECT *
FROM city
ORDER BY name`
  );
}
