import fetch from 'node-fetch';
import { DateTime } from 'luxon';

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


class HTTPResponseError extends Error {
	constructor(response) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`);
		this.response = response;
	}
}

const checkStatus = response => {
	if (response.ok) {
		// response.status >= 200 && response.status < 300
		return response;
	} else {
		throw new HTTPResponseError(response);
	}
}

async function graphQL(query, key) {
  const url = `http://localhost:4000/graphQL`;
  const body = new URLSearchParams();
  body.append('query', query);

  let response = await fetch(url, {
    method: 'POST',
    body,
  });
  try {
    checkStatus(response);
    let json = await response.json();
    return json.data[key];
  } catch (error) {
    console.error(error);

    const errorBody = await error.response.text();
    console.error(`Error body: ${errorBody}`);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

let firstNameIndex = 0;

async function createHousehold(lastName) {
  const createHouseholdGraphQL = `
  mutation{
    updateHousehold(
      household: {  id: -1, address1: "", address2: "", cityId: 0, zip: "", incomeLevelId: 0, note: "" } , inPlace: false) {
        id address1 address2 cityId zip incomeLevelId note
      }
  }`;


  console.log(`creating ${lastName} household`);

  let household = await graphQL(createHouseholdGraphQL,'updateHousehold');

  const householdId = household.id;

  let clientCount = getRandomInt(1, 8);

  while(clientCount > 0) {
    let firstName = firstNames[firstNameIndex];
    firstNameIndex += 1;
    firstNameIndex %= firstNames.length;

    let name = `${firstName} ${lastName}`;

    const createClientGraphQL = `
    mutation{
      updateClient(
        client: {  id: -1, householdId: ${householdId}, name: "${name}", disabled: -1, raceId: 0, birthYear: "", genderId: 0, refugeeImmigrantStatus: -1, speaksEnglish: -1, militaryStatusId: 0, ethnicityId: 0 } , inPlace: true) {
          id householdId name disabled raceId birthYear genderId refugeeImmigrantStatus speaksEnglish militaryStatusId ethnicityId
        }
    }`;
    console.log(`creating client ${name}`);
    let client = await graphQL(createClientGraphQL, 'updateClient');
    clientCount -= 1;
  };

  let visitCount = getRandomInt(1, 8);
  let  date = DateTime.now().setZone('America/Los_Angeles')
  while(visitCount > 0) {
    let weeksBack = getRandomInt(1, 2);
    date = date.minus({ weeks: weeksBack });

    let year = date.year;
    let month = date.month;
    let day = date.day;

    let recordVisitGraphQL= `
    mutation{recordVisit(
        householdId: ${householdId}, year: ${year}, month: ${month}, day: ${day}){date}}`;

    console.log('recording visit on ' + date.toISODate());
    let visit = await graphQL(recordVisitGraphQL, "recordVisit");
    visitCount -= 1;
  }

}

await Promise.all(lastNames.map( lastName => createHousehold(lastName) ));


