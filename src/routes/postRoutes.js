const express = require('express');
const postController = require('../controllers/PostController');
const { validateToken } = require('../middlewares/validateToken');
const { validatePost } = require('../middlewares/validatePost');

const routers = express.Router();

routers.post('/', validateToken, validatePost, postController.createPost);

routers.get('/', validateToken, postController.getAllPosts);

module.exports = routers;