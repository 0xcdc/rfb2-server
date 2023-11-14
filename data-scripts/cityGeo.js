import cityLatLng from './cityLatLng.js';

const updateStatements = cityLatLng.map( city => `
  update city
    set latLng = '${city.latlng}'
    where city.id = ${city.id};
`);

const sql = updateStatements.join('');
console.log(sql);
