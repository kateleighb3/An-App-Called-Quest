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
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gallery_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'gallery',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'painting',
  }
);

module.exports = Excursion;
