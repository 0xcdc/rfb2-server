import { credentials } from '../credentials.js';
import fetch from 'node-fetch';

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
};

export async function geocode(address) {
  const geocodeUrl = new URL(`https://maps.googleapis.com/maps/api/geocode/json`);
  geocodeUrl.searchParams.append('address', address);
  geocodeUrl.searchParams.append('key', credentials.googleGeoCodeApiKey);
  const response = await fetch(geocodeUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });
  try {
    checkStatus(response);
    const json = await response.json();
    if (json.status == 'OK') {
      const { location } = json.results[0].geometry;
      return location;
    } else {
      console.error(json);
      return null;
    }
  } catch (error) {
    console.error(error);

    const errorBody = await error.response.text();
    console.error(`Error body: ${errorBody}`);
    return null;
  }
}


