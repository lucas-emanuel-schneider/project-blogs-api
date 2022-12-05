const blogPostServices = require('../services/BlogPostService');

const createPost = async (req, res) => {
  const { authorization: token } = req.headers;
  const { type, message } = await blogPostServices.createPost(req.body, token);
  if (type) return res.status(400).json({ message });
  res.status(201).json(message);
};

const getAllPosts = async (_req, res) => {
  const allPosts = await blogPostServices.getAllPosts();
  res.status(200).json(allPosts);
};
const getPostById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await blogPostServices.getPostById(Number(id));
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};