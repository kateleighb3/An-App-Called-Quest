const router = require('express').Router();
const { errorMonitor } = require('stream');
const { Excursion, Trip } = require('../../models');

// The `/api/excursion` endpoint

router.get('/', async (req, res) => {
  try {
    const excursionData = await Excursion.findAll({
      attributes: ['id', 'name', 'date', 'time', 'description', 'trip_id'],
      include: {
        model: Trip,
        attributes: ['id', 'name', 'location', 'starting_date', 'ending_date'],
      }
    });
    res.status(200).json(excursionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const excursionData = await Excursion.findByPk(req.params.id, {
      attributes: ['id','name', 'date', 'time', 'description','trip_id'],
      include: [{model: Trip}] 
      });

    if (!excursionData) {
      res.status(404).json({ message: 'No excursion found with this id!' });
      return;
    }

    res.status(200).json(excursionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {

    const newExcursion = await Excursion.create({
      trip_id: req.body.trip_id, //////
      name: req.body.exc_name_form_value, //model/db name: req.body."form_value"
      date: req.body.date_form_value,
      time: req.body.time_form_value,
      description: req.body.description_form_value,
    });
    // console.log("tripId", trip_id); // commenting this out fixed excursions to appear on page when "add" button clicked rather than error message and only appears after page refreshed.
    res.status(200).json(newExcursion);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// router.put('/:id', (req, res) => {
//   Tag.update(req.body, {
// where: {
//   id: req.params.id
// }
//   })
// .then(dbTagData => {
//   if (!dbTagData){
// res.status(404).json({message:'No tag found with this id'});
// return;
//   }
//   res.json(dbTagData);
// })
// .catch(err => {
//   console.log(err);
//   res.status(500).json(err);
// });
// update a tag's name by its `id` value
// });

router.delete('/:id', async (req, res) => {
  try {
    const excursionData = await Excursion.destroy({
      where: {
        id: req.params.id,
        // trip_id: req.body.trip_id, // commenting this out + placing const trip_id in trip.js into global scope in trip.js enables user to delete excursions.
      }
    });

    if (!excursionData) {
      res.status(404).json({ message: 'No excursion found with this id!' });
      return;
    }

    res.status(200).json(excursionData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete on excursion by its `id` value

module.exports = router;