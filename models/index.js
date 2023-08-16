const User = require('./User');
const Trip = require('./Trip');
const Excursion = require('./Excursion');

User.hasMany(Trip, {
  foreignKey: 'user_id',
});

Trip.belongsTo(User, {
  foreignKey: 'user_id',
});

Trip.hasMany(Excursion, {
  foreignKey: "trip_id",
});

Excursion.belongsTo(Trip, {
  foreignKey: "trip_id",
});

module.exports = { 
  User, 
  Trip, 
  Excursion,
};
