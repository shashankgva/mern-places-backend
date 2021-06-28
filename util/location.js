const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyDDodv2N7HG02qLSxfMIjxcyWxvwYqQD4U';

async function getCoordsForAddress(address) {
  // return {
  //   lat: 40.7484474,
  //   lng: -73.9871516
  // };
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  let coordinates = '';
  if (data.results && data.results[0]) {
    coordinates = data.results[0].geometry.location;
  }

  return coordinates;
}

module.exports = getCoordsForAddress;
