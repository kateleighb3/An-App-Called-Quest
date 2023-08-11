const seedExcursions = require('./excursionData');
const seedTrips = require('./tripData');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');

    await seedExcursions();
        console.log('\n----- EXCURSIONS SEEDED -----\n');

    await seedTrips();
        console.log('\----- TRIPS SEEDED -----\n');

    process.exit(0);
};

seedAll();