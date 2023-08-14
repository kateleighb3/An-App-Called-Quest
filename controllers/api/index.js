const router = require('express').Router();
const userRoutes = require('./user-routes');
const tripRoutes = require('./trip-routes');
const excursionRoutes = require('./excursion-routes');

router.use('/users', userRoutes);
router.use('/trip', tripRoutes);
router.use('/excursion', excursionRoutes);




module.exports = router;
