const joiValidation = require('./joiValidation');

const validateUpdatePost = (req, res, next) => {
  const { error } = joiValidation.postUpdateValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = { validateUpdatePost };