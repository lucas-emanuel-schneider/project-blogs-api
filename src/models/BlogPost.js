'use strict';
module.exports = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
      },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      },
  }, {
    modelName: 'BlogPost',
    timestamps: false,
    tableName: 'blog_posts',
    underscored: true,
  });
  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User'
    })
  }
  return blogPost;
};