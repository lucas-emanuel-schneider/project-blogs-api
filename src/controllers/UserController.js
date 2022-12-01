const userServices = require('../services/UserService');

const getUser = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await userServices.getUser(email, password);
  if (type) return res.status(400).json({ message });
  res.status(200).json({ token: message });
};

const createUser = async (req, res) => {
  const { type, message } = await userServices.createUser(req.body);
  if (type) return res.status(409).json({ message });
  res.status(201).json({ token: message });
};

module.exports = {
  getUser,
  createUser,
};