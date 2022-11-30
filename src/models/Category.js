'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
      },
    name: DataTypes.STRING,
  }, {
    modelName: 'Category',
    timestamps: false,
    tableName: 'categories',
    underscored: true,
  });
  return category;
};