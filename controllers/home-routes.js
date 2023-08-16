const router = require('express').Router();
const { Trip, Excursion, User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all trips for homepage
router.get('/', async (req, res) => {
  try {
    const dbTripData = await Trip.findAll({
      include: [
        {
          model: Excursion,
          attributes: ['name', 'date', 'time', 'description'],
        },
      ],
    });

    const trips = dbTripData.map((trip) =>
      trip.get({ plain: true })
    );

    res.render('homepage', { layout: 'main',
       trips,
       loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one trip
// Use the custom middleware before allowing the user to access the gallery
router.get('/trip/:id', withAuth, async (req, res) => {
  try {
    const dbTripData = await Trip.findByPk(req.params.id, {
      include: [
        {
          model: Excursion,
          attributes: [
            'name',
            'date',
            'time',
            'description',
          ],
        },
      ],
    });

    const trip = dbTripData.get({ plain: true });
    res.render('trip', {layout: 'maind', ...trip, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//get all excursions
router.get('/', async (req, res) => {
  try {
    const dbExcursionData = await Excursion.findAll({
      attributes: ['id','name', 'date', 'time', 'description', 'trip_id'],
        });


    const excursions = dbExcursionData.map((excursion) =>
      excursion.get({ plain: true })
    );

    res.render('trip', { layout: 'maind',
       excursions,
       loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET one excursion
// Use the custom middleware before allowing the user to access the painting
router.get('/excursion/:id', withAuth, async (req, res) => {
  try {
    const dbExcursionData = await Excursion.findByPk(req.params.id);

    const excursion = dbExcursionData.get({ plain: true });

    res.render('excursion', {layout:'mainb', ...excursion, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Trip }],
    });

    console.log('userData:', userData);

    if (!userData) {
      console.error('User data not found for session user ID:', req.session.user_id);
      // Handle the case where userData is null, e.g., send an error response
      res.status(404).json({ message: 'User data not found' });
      return;
    }

    const user = userData.get({ plain: true });

    res.render('profile', {layout: 'mainc',
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Internal server error"});
    return;
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login', {layout: 'mainb'});
});

module.exports = router;