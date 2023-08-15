const { Trip } = require('../models');

const tripdata = [
  {
    name: 'FALL 2023 Jacksonhole, WYOMING',
    location: 'Jacksonhole, Wyoming',
    starting_date: 'August 29, 2023',
    ending_date: 'September 3, 2023',
    gear: 'water bottle',
    user_id: 1,
  },
  {
    name: '2023 KEY WEST',
    location: 'Key West',
    starting_date: 'September 29, 2023',
    ending_date: 'October 4, 2023',
    gear: 'sun hat, water bottle, sunscreen',
    user_id: 2,
  },
  {
    name: 'VEGAS CLIMBING TRIP',
    location: 'Las Vegas',
    starting_date: 'October 29, 2023',
    ending_date: 'Novermber 3, 2023',
    gear: 'rope, harness, climbing shoes, chalk, sunscreen',
    user_id: 3,
  },
  
];

const seedTrip = () => Trip.bulkCreate(tripdata);

module.exports = seedTrip;
