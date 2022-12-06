const { BlogPost, PostCategory, User, Category } = require('../models');
const { verifyCategoriesById } = require('./validations/categoriesValidation');
const { validatePostUpdate } = require('./validations/validatePostUpdate');
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

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', throught: { attributes: [] } }],
  });
  return allPosts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', throught: { attributes: [] } }],
  });
  if (!post) return { type: 'error', message: 'Post does not exist' };
  return { type: null, message: post.dataValues };
};

const updatePost = async (idUser, idPost, updateContent) => {
  const { type, message } = await validatePostUpdate(idPost, idUser);
  if (type) return { type, message };
  await BlogPost.update(updateContent, { where: { id: idPost } });
  const response = await getPostById(idPost);
  return { type: null, message: response.message };
};

const deletePostById = async (id, userId) => {
  const verifyPost = await getPostById(id);
  if (verifyPost.type) return { ...verifyPost, errorStatus: 404 };
  const verifyUser = await validatePostUpdate(id, userId);
  if (verifyUser.type) return { ...verifyUser, errorStatus: 401 };
  await BlogPost.destroy({ where: { id } });
  return { type: null, message: 'Post deleted', errorStatus: null };
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePostById,
};