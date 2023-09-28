const router = require('express').Router();
const userRoutes = require('./userRoutes');
const newsRoutes = require('./newsRoutes')
const weatherRoutes = require('./weatherRoutes');

router.use('/users', userRoutes);
router.use('/news', newsRoutes)
router.use('/weather', weatherRoutes);

module.exports = router;

