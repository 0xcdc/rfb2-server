import { geocode, graphQL } from '../src/fetch.js';

async function getHouseholds() {
  const query = `{households(ids: []) {id  address1 address2 city{name} zip}}`;

  const households = await graphQL(query, 'households');
  const addresses = households.map( h => ({
    id: h.id,
    address: h.address1 + ' ' + h.address2 + ' ' + h.city.name + '  ' + h.zip,
  }));
  return addresses;
}

async function main() {
  let households = await getHouseholds();
  households = households.slice(0, 1);
  for (let i=0; i < households.length; i++) {
    const h = households[i];
    const location = await geocode(h.address);
    console.log(location);
  }
}

main();
