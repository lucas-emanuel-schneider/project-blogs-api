const userServices = require('../services/UserService');
const { verifyToken } = require('../auth/jwtFunctions');

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

const getAllUsers = async (req, res) => {
 const result = await userServices.getAllUsers();
 res.status(200).json(result);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userServices.getUserById(Number(id));
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

const deleteUserById = async (req, res) => {
  const { authorization: token } = req.headers;
  const tRes = verifyToken(token);
  await userServices.deleteUserById(tRes.message.data.id);
  res.sendStatus(204);
};

module.exports = {
  getUser,
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
};