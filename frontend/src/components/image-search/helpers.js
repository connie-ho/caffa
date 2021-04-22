import axios from "axios";

export function stripSearchTerms(searchObject) {
  const strippedWords = [
    "coffee",
    "decaf",
    "organic",
    "usda",
    "roast",
    "roasted",
  ];
  const wordsToReplace = new RegExp(
    "\\b" + strippedWords.join("|") + "\\b",
    "gi"
  );

  return searchObject
    .replace(/\n/g, " ")
    .replace(/[.,/#!$%^&*;°•':{}=\-_`~()]/g, "")
    .replace(wordsToReplace, "")
    .toLowerCase();
}

export async function googleImageDetection(url) {
  let body = JSON.stringify({
    requests: [
      {
        features: [{ type: "TEXT_DETECTION", maxResults: 10 }],
        image: {
          source: {
            imageUri: url,
          },
        },
      },
    ],
  });

  let response = "";

  try {
    response = await axios.post("/api/search", { body });
  } catch (error) {
    console.error(error);
  }

  //If data sent back is an error message
  if (!response || response.data.error) {
    return ["error"];
  }
  //If data sent back is an empty object
  else if (Object.keys(response.data).length === 0) {
    return [];
  } else {
    let finalArray = response.data.textAnnotations.map(function (obj) {
      return obj.description;
    });

    return finalArray;
  }
}
