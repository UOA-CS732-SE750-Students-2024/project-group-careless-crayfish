const fetch = require('node-fetch');

async function fetchRestaurantRecommendations(location) {
  const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=';
  const apiKey = 'AIzaSyCa-FGEff49LSRM3ITCnJ6LyhRRWFE9d3s';

  const headers = {
    'Content-Type': 'application/json',
  };

  const body = {
    contents: [{
      parts: [{
        text: `recommend me some restaurants around ${location}, return me in json format [(name, location, description, priceRange)]`
      }]
    }]
  };

  try {
    const response = await fetch(`${apiUrl}${apiKey}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0].text) {
      throw new Error('Invalid response structure');
    }

    const recommendations = data.candidates[0].content.parts[0].text.replace(/```/g, '').replace(/^json/g,'').trim().replace(/\n/g, '');
    return recommendations;
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  fetchRestaurantRecommendations,
  // Export other function
};