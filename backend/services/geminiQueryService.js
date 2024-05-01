const fetch = require("node-fetch");
const logger = require("../utils/logger.js");

const commentService = require("./commentService.js");

async function fetchRestaurantRecommendations(location, ageGroup, cuisine) {
  // eslint-disable-next-line no-undef
  const apiUrl = process.env.API_URL;
  // eslint-disable-next-line no-undef
  const apiKey = process.env.API_KEY || "";

  const headers = {
    "Content-Type": "application/json",
  };
  
  location = location ? location : "University Of Auckland";

  const queryStr = `recommend me 7 ${cuisine} restaurants around ${location} for ${ageGroup} age group, return it in JSON format [(name, location, description, priceRange, websiteUrl, detailIntroduction, openHours)]`;
  console.log(`gemini query str: ${queryStr}`);

  const body = {
    contents: [
      {
        parts: [
          {
            text: queryStr,
          },
        ],
      },
    ],
  };

  const response = await fetch(`${apiUrl}${apiKey}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  logger.info(`Gemini response status: ${response.status}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  // console.log(JSON.stringify(data));

  if (
    !data.candidates ||
    !data.candidates[0].content ||
    !data.candidates[0].content.parts ||
    !data.candidates[0].content.parts[0].text
  ) {
    throw new Error("Invalid response structure");
  }

  const recommendations = data.candidates[0].content.parts[0].text
    .replace(/```/g, "")
    .replace(/^json/g, "") // seem like 'ig' flag is not working
    .replace(/^JSON/g, "")
    .trim()
    .replace(/\n/g, "");
  return recommendations;
}

async function getAIComment({ userId, voteId, comment }) {
  logger.info(
    `getting AI response for userId=${userId} voteId=${voteId} comment=${comment}`
  );
  // eslint-disable-next-line no-undef
  const apiUrl = process.env.API_URL;
  // eslint-disable-next-line no-undef
  const apiKey = process.env.API_KEY || "";


  const headers = {
    "Content-Type": "application/json",
  };

  const body = {
    contents: [
      {
        parts: [
          {
            text: `Reply to this comment:"${comment}"`,
          },
        ],
      },
    ],
  };

  logger.info(JSON.stringify(body));

  const response = await fetch(`${apiUrl}${apiKey}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  const data = await response.json();
  logger.info(
    `got AI response for userId=${userId} voteId=${voteId} comment=${comment}`
  );

  return data.candidates[0].content.parts[0].text;
}

module.exports = {
  fetchRestaurantRecommendations,
  getAIComment,
};
