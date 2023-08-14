const { Excursion } = require('../models');

const excursiondata = [
  {
    name: 'White Water Rafting',
    date: 'August 30, 2023',
    time: '3',
    description:
      'White water rafting the Snake River.',
  },
  {
    name: 'Deep Sea Fishing',
    date: 'September 30, 2023',
    time: '5',
    description:
      'Deep Sea Fishing in Key West.',
  },
  {
    name: 'Rock Climbing',
    date: 'October 30, 2023',
    time: '8',
    description:
      'Rock Climbing Red Rocks Canyon.',
  },
  
];

const seedExcursion = () => Excursion.bulkCreate(excursiondata);

module.exports = seedExcursion;
