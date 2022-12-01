const express = require('express');
const categoriesController = require('../controllers/CategoriesController');
const { validateToken } = require('../middlewares/validateToken');
const { validateName } = require('../middlewares/validateName');

const routers = express.Router();

routers.post('/', validateToken, validateName, categoriesController.createNewCategory);

routers.get('/', validateToken, categoriesController.getAllCategories);

module.exports = routers;