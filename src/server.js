const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

// Endpoint for /numbers
app.get('/numbers', async (req, res) => {
  const urls = req.query.url;
  const requests = Array.isArray(urls) ? urls : [urls];
  const responses = [];
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  });

  try {
    for (const url of requests) {
      const response = await axios.get(url);
      responses.push(response.data);
    }

    const result = {
      primes: [],
      odds: [],
      fibos: []
    };

    for (const response of responses) {
      if (response.primes) {
        result.primes = result.primes.concat(response.primes);
      }
      if (response.odds) {
        result.odds = result.odds.concat(response.odds);
      }
      if (response.fibos) {
        result.fibos = result.fibos.concat(response.fibos);
      }
    }

    result.primes.sort((a, b) => a - b);
    result.odds.sort((a, b) => a - b);
    result.fibos.sort((a, b) => a - b);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving data from the URLs.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
