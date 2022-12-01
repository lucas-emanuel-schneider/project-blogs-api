const jwtFuncs = require('../auth/jwtFunctions');

const validateToken = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token not found' });
    const { type, message } = jwtFuncs.verifyToken(token);
  if (type) {
    return res.status(401).json({ message });
  }
  next();
};

module.exports = { 
  validateToken,
  };