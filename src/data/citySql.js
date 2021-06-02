import database from './root';

export function loadAllCities() {
  const cities = database.all(
    `
SELECT *
FROM city
ORDER BY name`,
  );

  return cities;
}

export function loadCityById(id) {
  const cities = database.all(
    `
SELECT *
FROM city
where id = :id`,
    { id },
  );

  return cities[0];
}


