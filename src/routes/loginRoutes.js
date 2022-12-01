const express = require('express');
const userController = require('../controllers/UserController');
const validateLogin = require('../middlewares/validateLogin');

const routers = express.Router();

routers.post('/', validateLogin, userController.getUser);

module.exports = routers;