const { User } = require('../models');
const jwtFuncs = require('../auth/jwtFunctions');

const getUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
    return { type: 'error', message: 'Invalid fields' };
  }
  const { password: _, ...userWithoutPassword } = user;
  const token = jwtFuncs.createToken(userWithoutPassword);
  return { type: null, message: token };
};

module.exports = {
  getUser,
};