const User = require('./User');
const Trip = require('./Trip');
const Excursion = require('./Excursion');
const TripExcursion = require('./TripExcursion');

User.hasMany(Trip, {
  foreignKey: 'user_id',
});

Trip.belongsTo(User, {
  foreignKey: 'user_id',
});

Trip.belongsToMany(Excursion, {
  through: TripExcursion,
  foreignKey: 'trip_id',
});

Excursion.belongsToMany(Trip, {
  through: TripExcursion,
  foreignKey: 'excursion_id',
});

module.exports = { 
  User, 
  Trip, 
  Excursion,
  TripExcursion, 
};
