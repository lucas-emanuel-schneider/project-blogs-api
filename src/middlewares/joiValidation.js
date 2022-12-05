const joi = require('joi');

const loginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
 });

 const userValidation = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  image: joi.string(),
 });

 const nameValidation = joi.object({
  name: joi.string().required(),
 });

 const postValidation = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().required().min(1),
});

const postUpdateValidation = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
});

module.exports = {
  loginValidation,
  userValidation,
  nameValidation,
  postValidation,
  postUpdateValidation,
};