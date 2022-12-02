const joiValidation = require('./joiValidation');

const validatePost = (req, res, next) => {
  const { error } = joiValidation.postValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = {
  validatePost,
  };