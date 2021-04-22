const axios = require('axios');
const yelp = require('yelp-fusion');

const yelpAPIKey = process.env.YELP_API_KEY;
const client = yelp.client(yelpAPIKey);

const fetchMyIP = function() {
  return axios.get('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(ip) {
  return axios.get(`https://freegeoip.app/json/${ip}`);
};

const fetchBusinessDetailsCit = function(term, location) {
  const searchRequest = {
    term: term,
    location: location.city || 'Vancouver',
    categories: 'coffee,coffeeroasteries,cafes',
    limit: 1,
  };

  return client.search(searchRequest)
    .then(res => {
      
      if (!res.jsonBody.businesses.length) {
        return fetchBusinessDetailsCountry('cafe', location);
      }
      return res.jsonBody.businesses[0];

    });
};

const fetchBusinessDetailsCountry = function(term, location) {
  const searchRequest = {
    term: term,
    location: location.country_name || 'Canada',
    categories: 'coffee,coffeeroasteries,cafes',
    limit: 1,
  };

  return client.search(searchRequest)
    .then(res => res.jsonBody.businesses[0]);
};


const getCafeData = function(query) {
  return fetchMyIP()
    .then(res=> fetchCoordsByIP(res.data.ip))
    .then(res => res.data)
    .then(res => fetchBusinessDetailsCit(query, res));
};

module.exports = {
  getCafeData
};