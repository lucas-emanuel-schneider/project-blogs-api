const blogPostServices = require('../services/BlogPostService');
const { verifyToken } = require('../auth/jwtFunctions');

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

const updatePost = async (req, res) => {
  const { authorization: token } = req.headers;
  const tRes = verifyToken(token);
  const { id } = req.params;
  const content = req.body;
  const { type, message } = await blogPostServices.updatePost(tRes.message.data.id, id, content);
  if (type) return res.status(401).json({ message });
  res.status(200).json(message);
};

const deletePostById = async (req, res) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  const tRes = verifyToken(token);
  const { type, message, errorStatus } = await blogPostServices
  .deletePostById(id, tRes.message.data.id);
  if (type) return res.status(errorStatus).json({ message });
  res.sendStatus(204);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePostById,
};