const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seuSegredoAqui';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '3d',
};

const createToken = (userWithoutPassword) => {
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  return token;
};

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, secret);
    return { type: null, message: payload };
  } catch (error) {
    return { type: 'error', message: error };
  }
};

module.exports = { createToken, verifyToken };