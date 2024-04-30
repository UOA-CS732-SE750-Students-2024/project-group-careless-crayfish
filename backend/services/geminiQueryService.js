const fetch = require("node-fetch");
const logger = require("../utils/logger.js");

async function fetchRestaurantRecommendations(location) {
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
            text: `recommend me some restaurants around ${location}, return me in json format [(name, location, description, priceRange)]`,
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
    .replace(/^json/g, "")
    .trim()
    .replace(/\n/g, "");
  return recommendations;
}

async function getAIComment({ userId, voteId, comment }) {
  logger.info(
    `getting AI response for userId=${userId} voteId=${voteId} comment=${comment}`
  );
  // eslint-disable-next-line no-undef
  // const apiUrl = process.env.API_URL;
  // eslint-disable-next-line no-undef
  // const apiKey = process.env.API_KEY || "";

  const apiUrl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=";
  const apiKey = "AIzaSyCa-FGEff49LSRM3ITCnJ6LyhRRWFE9d3s";
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
