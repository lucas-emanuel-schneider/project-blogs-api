'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
      },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    modelName: 'User',
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });

  user.associate = (models) => {
    user.hasMany(models.BlogPosts, {
      foreignKey: 'id',
      as: 'BlogPost'
    })
  };

  return user;
};