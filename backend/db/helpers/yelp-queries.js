const axios = require('axios');
const yelp = require('yelp-fusion');

const yelpAPIKey = process.env.YELP_API_KEY;
const client = yelp.client(yelpAPIKey);

// const fetchMyIP = function() {
//   return axios.get('https://api.ipify.org?format=json');
// };

const getClientAddress = function (req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0] 
      || req.connection.remoteAddress;
};

const fetchCoordsByIP = function(ip) {
  console.log(ip)
  return axios.get(`https://freegeoip.app/json/${ip}`);
};

const fetchBusinessDetailsCity = function(term, location) {
  const searchRequest = {
    term: term,
    location: location.city || 'Vancouver',
    categories: 'coffee,coffeeroasteries,cafes',
    limit: 1,
  };
  console.log(searchRequest)

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
  console.log(searchRequest)

  return client.search(searchRequest)
    .then(res => res.jsonBody.businesses[0]);
};


const getCafeData = function(query, ip) {
    return fetchCoordsByIP(ip)
    .then(res => res.data)
    .then(res => fetchBusinessDetailsCity(query, res));
};

module.exports = {
  getCafeData
};