const User = require('./User');
const Trip = require('./Trip');
const Excursion = require('./Excursion');

Excursion.hasMany(Trip, {
  foreignKey: 'excursion_id',
});

Trip.belongsTo(Excursion, {
  foreignKey: 'trip_id',
});

module.exports = { User, Excursion, Trip };
