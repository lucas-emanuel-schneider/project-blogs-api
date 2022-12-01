const userServices = require('../services/UserService');

const getUser = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await userServices.getUser(email, password);
  if (type) return res.status(400).json({ message });
  res.status(200).json({ token: message });
};

module.exports = {
  getUser,
};