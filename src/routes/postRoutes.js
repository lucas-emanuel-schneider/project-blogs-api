const express = require('express');
const postController = require('../controllers/PostController');
const { validateToken } = require('../middlewares/validateToken');
const { validatePost } = require('../middlewares/validatePost');
const { validateUpdatePost } = require('../middlewares/validateUpdatePost');

const routers = express.Router();

routers.get('/search', validateToken, postController.searchPostsByContentAndTitle);

routers.post('/', validateToken, validatePost, postController.createPost);

routers.get('/', validateToken, postController.getAllPosts);

routers.get('/:id', validateToken, postController.getPostById);

routers.put('/:id', validateToken, validateUpdatePost, postController.updatePost);

routers.delete('/:id', validateToken, postController.deletePostById);

module.exports = routers;