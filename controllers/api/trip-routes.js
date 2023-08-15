const router = require('express').Router();
const { Trip, User, Excursion, TripExcursion } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/trips` endpoint

// get all trips
router.get('/', async (req, res) => {
  try {
    const tripData = await Trip.findAll({
      attributes: ['id', 'name', 'location', 'starting_date', 'ending_date', 'gear'],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
            model: Excursion,
            attributes: ['name', 'date', 'time', 'description']
        }]
  });
    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
// get one trip
router.get('/:id', async (req, res) => {
  try {
    const tripData = await Trip.findByPk(req.params.id, {
      attributes: ['id', 'name', 'location', 'starting_date', 'ending_date', 'gear'],
      // JOIN with locations, using the Trip through table
      include: [{model: Excursion, through: TripExcursion,}]
    });

    if (!tripData) {
      res.status(404).json({ message: 'No trip found with this id!' });
      return;
    }

    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new trip
router.post('/', withAuth, async (req, res) => {
  try {
    const newTrip = await Trip.create({
      user_id: req.session.user_id,
      name: req.body.trip_name_form_value, //model/db name: req.body."form_value"
      location: req.body.location_form_value,
      starting_date: req.body.starting_date_form_value,
      ending_date: req.body.ending_date_form_value,
      gear: req.body.gear_form_value,
      });
    res.status(200).json(newTrip);
  } catch (err) {
    res.status(400).json(err);
  }
});
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  
// update trip
router.put('/:id', (req, res) => {
  // update trip data
  Trip.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((trip) => {
      if (req.body.excursionIds && req.body.excursionIds.length) {
        
        TripExcursion.findAll({
          where: { trip_id: req.params.id }
        }).then((tripExcursion) => {
          // create filtered list of new excursion_ids
          const tripExcursionIds = tripExcursion.map(({ excursion_id }) => excursion_id);
          const newTripExcursion = req.body.excursionIds
          .filter((excursion_id) => !tripExcursionIds.includes(excursion_id))
          .map((excursion_id) => {
            return {
              trip_id: req.params.id,
              excursion_id,
            };
          });

            // figure out which ones to remove
          const tripExcursionRemove = tripExcursion
          .filter(({ excursion_id }) => !req.body.excursionIds.includes(excursion_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            TripExcursion.destroy({ where: { id: tripExcursionRemove } }),
            TripExcursion.bulkCreate(newTripExcursion),
          ]);
        });
      }

      return res.json(trip);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  try {
    const tripData = await Trip.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });

    if (!tripData) {
      res.status(404).json({ message: 'No trip found with this id!' });
      return;
    }

    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
