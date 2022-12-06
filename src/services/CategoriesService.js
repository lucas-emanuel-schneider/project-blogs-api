const { Category } = require('../models');

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

const createNewCategory = async ({ name }) => {
  const categoryAlreadyExists = await Category.findOne({ where: { name } });
  if (categoryAlreadyExists) return { type: 'error', message: 'category already exists' };
  const category = await Category.create({ name });
  return { type: null, message: category };
};

module.exports = {
  createNewCategory,
  getAllCategories,
};