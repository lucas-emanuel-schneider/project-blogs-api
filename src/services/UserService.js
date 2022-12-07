const { User } = require('../models');
const jwtFuncs = require('../auth/jwtFunctions');

const findUserByEmail = async (email) => {
  const result = await User.findOne({ where: { email } });
  return result;
};

const getUser = async (email, password) => {
  const user = await findUserByEmail(email);
    if (!user || user.password !== password) {
    return { type: 'error', message: 'Invalid fields' };
  }
  const { password: _, ...userWithoutPassword } = user.dataValues;
  const token = jwtFuncs.createToken(userWithoutPassword);
  return { type: null, message: token };
};

const createUser = async (newUser) => {
  const userAlreadyCreated = await findUserByEmail(newUser.email);
  if (userAlreadyCreated) return { type: 'error', message: 'User already registered' };
  await User.create(newUser);
  const { password, ...userWithoutPassword } = newUser;
  const token = jwtFuncs.createToken(userWithoutPassword);
  return { type: null, message: token };
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
  return allUsers;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (!user) return { type: 'erro', message: 'User does not exist' };
  return { type: null, message: user };
};

const deleteUserById = async (id) => User.destroy({ where: { id } });

module.exports = {
  getUser,
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
};