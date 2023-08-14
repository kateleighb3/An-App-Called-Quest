const { TripExcursion } = require('../models');

const tripExcursionData = [
  {
    trip_id: 1,
    excursion_id: 1,
  },
  {
    trip_id: 2,
    excursion_id: 2,
  },
  {
    trip_id: 3,
    excursion_id: 3,
  },
];

const seedTripExcursion = () => TripExcursion.bulkCreate(tripExcursionData);

module.exports = seedTripExcursion;
