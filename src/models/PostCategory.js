'use strict';
module.exports = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      foreignKey: true
      },
  }, {
    modelName: 'PostCategory',
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });
  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'postId',
      as: 'categories',
      otherKey: 'categoryId',
      through: postCategory,
    });
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'categoryId',
      as: 'posts',
      otherKey: 'postId',
      through: postCategory,
    });
  }
  return postCategory;
};