const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Excursion extends Model {}

Excursion.init(
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'excursion',
  }
);

module.exports = Excursion;
