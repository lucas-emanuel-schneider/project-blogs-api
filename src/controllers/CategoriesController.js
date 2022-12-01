const categoriesServices = require('../services/CategoriesService');

const createNewCategory = async (req, res) => {
  const { type, message } = await categoriesServices.createNewCategory(req.body);
  if (type) return res.status(400).json({ message });
  res.status(201).json(message);
};

const getAllCategories = async (_req, res) => {
 const result = await categoriesServices.getAllCategories();
 res.status(200).json(result);
};

module.exports = {
  createNewCategory,
  getAllCategories,
};