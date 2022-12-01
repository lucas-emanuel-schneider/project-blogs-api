const joiValidation = require('./joiValidation');

const validateUser = (req, res, next) => {
  const { error } = joiValidation.userValidation.validate(req.body);
  if (error) {
    const { message } = error.details[0];
    return res.status(400).json({ message });
  }
  next();
};

module.exports = {
  validateUser,
  };