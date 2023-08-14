const sequelize = require('../config/connection');
const seedTrip = require('./tripData');
const seedExcursion = require('./excursionData');
const seedTripExcursion = require('./tripexcursionData');
const seedUser = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedTrip();

  await seedExcursion();

  await seedTripExcursion();

  process.exit(0);
};

seedAll();
