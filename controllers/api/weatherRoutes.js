const router = require("express").Router();
const axios = require("axios");

// Route to get the weather using open weather api
router.get('/', async (req, res) => {

    try {
        const { lat, lon } = req.query;
        const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=imperial`;

        const response = await axios.get(weatherURL);

        const data = response.data;

        res.status(200).json(data)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

})

module.exports = router