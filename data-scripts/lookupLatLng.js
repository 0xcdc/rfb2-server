import url from 'node:url';
import fetch from 'node-fetch';
import { exit } from 'node:process';

const apiKey = "AIzaSyDuBNfxnYg4_JjaqoiGuUzoDkZ3GSI9Pdc"

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

async function geocode(id, address) {
  const geocodeUrl = new URL(`https://maps.googleapis.com/maps/api/geocode/json`);
  geocodeUrl.searchParams.append('address', address);
  geocodeUrl.searchParams.append('key', apiKey);
  let response = await fetch(geocodeUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });
  try {
    checkStatus(response);
    let json = await response.json();
    if (json.status == "OK") {
      let { location } = json.results[0].geometry;
      return {id, location};
    } else {
      console.error(json);
      return {id, location: null};
    }
  } catch (error) {
    console.error(error);

    const errorBody = await error.response.text();
    console.error(`Error body: ${errorBody}`);
    return null;
  }
}

async function graphQL(query, key) {
  const url = `http://localhost:4000/graphql`;
  const body = JSON.stringify({ query });

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
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

async function getClients() {
   const query = `{households(ids: []) {id  address1 address2 city{name} zip}}`;

   let households = await graphQL(query, 'households');
   let addresses = households.map( h => ({
     id: h.id,
     address: h.address1 + " " + h.address2 + " " + h.city.name + "  " + h.zip,
   }));
   return addresses;
}

async function main() {
  let clients = await getClients();
  clients = clients.slice(0, 1);
  for(let i=0; i < clients.length; i++) {
    let c = clients[i];
    let location = await geocode(c.id, c.address);
    console.log(location);
  }
}

main();
