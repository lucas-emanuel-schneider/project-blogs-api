const joiValidation = require('./joiValidation');

const validateName = (req, res, next) => {
  const { error } = joiValidation.nameValidation.validate(req.body);
  if (error) {
    const { message } = error.details[0];
    return res.status(400).json({ message });
  }
  next();
};

module.exports = {
  validateName,
  };