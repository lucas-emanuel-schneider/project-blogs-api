const { Category } = require('../../models');

const verifyCategoriesById = async (categoriesToPost) => {
  const allcategories = await Category.findAll();
  const check = allcategories
  .every((category) => categoriesToPost
  .some((id) => id === category.id));
  if (!check) return { type: 'error', message: 'one or more "categoryIds" not found' };
  return { type: null, message: check };
};

module.exports = {
  verifyCategoriesById,
};