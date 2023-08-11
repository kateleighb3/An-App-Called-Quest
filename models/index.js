const User = require('./User');
const Trip = require('./Trip');
const Excursion = require('./Excursion');

Gallery.hasMany(Painting, {
  foreignKey: 'user_id',
});

Painting.belongsTo(Gallery, {
  foreignKey: 'gallery_id',
});

module.exports = { User, Gallery, Painting };
