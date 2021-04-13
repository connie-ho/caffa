import axios from "axios";


export function stripSearchTerms(searchObject) {
  const strippedWords = ["coffee","decaf","organic","usda","roast","roasted"]
  const wordsToReplace= new RegExp("\\b"+strippedWords.join('|')+"\\b","gi")
  return searchObject.replace(/\n/g, " ").replace(/[.,\/#!$%\^&\*;°•':{}=\-_`~()]/g,"").replace(wordsToReplace, '').toLowerCase()
}

export async function googleImageDetection(url) {
  let body = JSON.stringify({
    requests: [
      {
        features: [
          {type: "TEXT_DETECTION", maxResults: 10}
        ],
        image: {
          source: {
            imageUri: url
          }
        }
      }
    ]
  });
  let response = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_GOOGLE_API_KEY}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: body
    }
  );
  
  let responseJson = await response.json();
  console.log(responseJson)
  
  if (!responseJson.responses[0]) {
    return
  }

  let finalArray = responseJson.responses[0].textAnnotations.map(function(obj) {
    return obj.description
  })
  
  return finalArray
}
