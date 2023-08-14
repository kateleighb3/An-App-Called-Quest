const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class TripExcursion extends Model {}

TripExcursion.init(
  {
    // define columns*
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    trip_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Trip',
        key: 'id',
      },
    },

    excursion_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Excursion',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'trip_excursion',
  }
);

module.exports = TripExcursion;
