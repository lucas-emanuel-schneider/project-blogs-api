const express = require('express');
const userController = require('../controllers/UserController');
const { validateUser } = require('../middlewares/validateUser');
const { validateToken } = require('../middlewares/validateToken');

const routers = express.Router();

routers.post('/', validateUser, userController.createUser);

routers.get('/', validateToken, userController.getAllUsers);

routers.get('/:id', validateToken, userController.getUserById);

routers.delete('/me', validateToken, userController.deleteUserById);

module.exports = routers;