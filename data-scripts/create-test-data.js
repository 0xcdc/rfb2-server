import { DateTime } from 'luxon';
import { graphQL } from '../src/fetch.js';

const firstNames = [
  'Able',
  'Ben',
  'Charlie',
  'Darian',
  'Elle',
  'Fanny',
  'Gretchen',
  'Harold',
  'Indie',
  'Jack',
  'Kelly',
  'Laurie',
  'Mickey',
  'Noah',
  'Oprah',
  'Penelope',
  'Quentin',
  'Russell',
  'Steve',
  'Tina',
  'Urckle',
  'Vicky',
  'Wendy',
  'Xu',
  'Ying',
  'Zed',
];

const lastNames = [
  'Arron',
  'Baker',
  'Cook',
  'Delong',
  'Esparanza',
  'Fitz',
  'Gage',
  'Heron',
  'Iggy',
  'Jeffers',
  'Klein',
  'Lomax',
  'Mouse',
  'Nice',
  'Orange',
  'Phelps',
  'Qi',
  'Raleigh',
  'Savage',
  'Thunder',
  'Usted',
  'Vick',
  'Wild',
  'Xu',
  'Yi',
  'Zevo',
];

const addresses1 = [
  '123 Bellingham st',
  '1800 Bellaire blvd',
  '1900 Richmond blvd',
  '300 Union ave se',
  '900 Bellevue st',
  '1000 Redmond rd',
  '234 Northup way',
  '321 Beechnut blvd',
  '7897 NE 8th st',
  '1258 SE 10th st',
  '8779 Broadway',
  '10000 Pike Street',
  '16857 Yesler',
  '7898 Alaskan Way',
  '9879 Denny Way',
  '4000 Pine Street',
  '100 1st Avenue',
  '5000 Ballard ave',
];
const addresses2 = [
  ' ',
  'Suite C102',
  'Unit 4',
  'Suite D307',
  'Apt 302',
  'Room C501',
  'Building D1001',
  'Floor 5',
  'Suite 200',
  'Suite 500',
];
const cityIds = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
];
const zips = [
  '98056',
  '98057',
  '98058',
  '98059',
  '98052',
  '98051',
  '98050',
  '98054',
  '98055',
  '98034',
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

let firstNameIndex = 0;

async function createHousehold(lastName) {
  const randomAddress1Index = getRandomInt(0, addresses1.length);
  const address1 = addresses1[randomAddress1Index];
  const randomAddress2Index = getRandomInt(0, addresses2.length);
  const address2 = addresses2[randomAddress2Index];
  const randomCityIdIndex = getRandomInt(0, cityIds.length);
  const cityId = cityIds[randomCityIdIndex];
  const randomZipIndex = getRandomInt(0, zips.length);
  const zip = zips[randomZipIndex];

  const newHousehold = (await graphQL(`
mutation { 
  household:createNewHousehold {
    id
    address1
    address2
    cityId
    zip
    incomeLevelId
    location {
     lat
     lng
    }
    note
    clients {
     id
     name
     genderId
     disabled
     refugeeImmigrantStatus
     ethnicityId
     raceId
     speaksEnglish
     militaryStatusId
     birthYear
     phoneNumber
    }
  }
}`)).data.household;

  newHousehold.address1 = address1;
  newHousehold.address2 = address2;
  newHousehold.cityId = cityId;
  newHousehold.zip = zip;

  let clientCount = getRandomInt(1, 8);

  while (clientCount > 0) {
    const firstName = firstNames[firstNameIndex];
    firstNameIndex += 1;
    firstNameIndex %= firstNames.length;

    const name = `${firstName} ${lastName}`;

    const newClient = (await graphQL(`
mutation {
  client:createNewClient {
    id
    name
    disabled
    birthYear
    genderId
    refugeeImmigrantStatus
    speaksEnglish
    militaryStatusId
    ethnicityId
    phoneNumber
    raceId
  }
}`)).data.client;

    newClient.name = name;
    newHousehold.clients.push(newClient);
    clientCount--;
  }

  console.log(`creating ${lastName} household`);

  const updateHouseholdQuery = `
mutation saveHouseholdChanges($household: HouseholdInput!){
  household:updateHousehold(household: $household) { id }
}`;

  await graphQL(updateHouseholdQuery, { household: newHousehold });

  let visitCount = getRandomInt(1, 8);
  let date = DateTime.now().setZone('America/Los_Angeles');
  const householdId = newHousehold.id;
  while (visitCount > 0) {
    const weeksBack = getRandomInt(0, 2);
    date = date.minus({ weeks: weeksBack });

    const { year } = date;
    const { month } = date;
    const { day } = date;
    const randomYear = getRandomInt(0, 2);
    const selectedYear = randomYear === 0 ? year : year - 1;
    const recordVisitGraphQL= `
    mutation{recordVisit(
        householdId: ${householdId}, year: ${selectedYear}, month: ${month}, day: ${day}){date}}`;

    console.log('recording visit on ' + date.toISODate());
    await graphQL(recordVisitGraphQL);
    visitCount -= 1;
  }
}

Promise.all(lastNames.map( lastName => createHousehold(lastName) ));


