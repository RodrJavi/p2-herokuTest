const router = require("express").Router();

// Get route to get news for homepage using newsApi
router.get('/', async (req, res) => {
    try {
      const apiKey = process.env.NEWS_API_KEY
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;