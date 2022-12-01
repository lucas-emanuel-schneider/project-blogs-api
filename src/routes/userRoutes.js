const express = require('express');
const userController = require('../controllers/UserController');
const { validateUser } = require('../middlewares/validateUser');

const routers = express.Router();

routers.post('/', validateUser, userController.createUser);

module.exports = routers;