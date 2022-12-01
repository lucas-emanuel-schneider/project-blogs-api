const joiValidation = require('./joiValidation');

const validateLogin = (req, res, next) => {
  const { error } = joiValidation.loginValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = validateLogin;