const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trip extends Model {}

Trip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    starting_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ending_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },

  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'trip',
  }
);
// Trip.prototype.addExcursion = async function(excursionId) {
//   try {
//     const excursion = await Excursion.findByPk(excursionId);

//     if (!excursion) {
//       throw new Error('Excursion not found');
//     }

//     await this.addExcursions(excursion);

//     console.log(`Added excursion "${excursion.name}" to trip "${this.name}"`);
//   } catch (error) {
//     console.error('Error adding excursion:', error);
//   }
// }

module.exports = Trip;
