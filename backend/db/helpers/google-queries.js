const axios = require('axios');

const getGoogleImageRecognition = function(query) {
  
  const headers = {"Accept":"application/json",
                    "Content-Type": "application/json"}

  return axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_API_KEY}`, query, {
    headers: headers
  })
  .then(res => res.data.responses[0]);
}

module.exports = {
  getGoogleImageRecognition
};