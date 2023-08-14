const router = require('express').Router();
const { Excursion, Trip, TripExcursion } = require('../../models');

// The `/api/excursion` endpoint

router.get('/', async (req, res) => {
  try {
    const excursionData = await Excursion.findAll({include: {
      model: Trip,
      attributes: ['name', 'starting_date', 'ending_date', 'gear', 'user_id']
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
      include: [{model: Trip, through: TripExcursion,}] 
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
    const excursionData = await Excursion.create(req.body);
    res.status(200).json(excursionData);
  } catch (err) {
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
        id: req.params.id
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
