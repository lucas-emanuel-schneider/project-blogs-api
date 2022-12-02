const blogPostServices = require('../services/BlogPostService');

const createPost = async (req, res) => {
  const { authorization: token } = req.headers;
  const { type, message } = await blogPostServices.createPost(req.body, token);
  if (type) return res.status(400).json({ message });
  res.status(201).json(message);
};

module.exports = {
  createPost,
};