const { BlogPost, PostCategory } = require('../models');
const { verifyCategoriesById } = require('./validations/categoriesValidation');
const jwtFuncs = require('../auth/jwtFunctions');

const linkPostWithCategory = async (categoryIds, id) => {
  await Promise.all(
    categoryIds.map((category) => PostCategory.create({
      categoryId: category, postId: id,
    })),
  );
};

const createPost = async ({ title, content, categoryIds }, token) => {
  const tokenVerified = jwtFuncs.verifyToken(token);
  const { id } = tokenVerified.message.data;
  const { type, message } = await verifyCategoriesById(categoryIds);
  if (type) return { type, message };
  const createdPost = await BlogPost.create({ userId: id, title, content });
  await linkPostWithCategory(categoryIds, createdPost.id);
  return { type: null, message: createdPost };
};

module.exports = {
  createPost,
};