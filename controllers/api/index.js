const router = require('express').Router();
const userRoutes = require('./userRoutes');
const venueRoutes = require('./venueRoutes');

router.use('/users', userRoutes);
router.use('/venues', venueRoutes);

module.exports = router;
