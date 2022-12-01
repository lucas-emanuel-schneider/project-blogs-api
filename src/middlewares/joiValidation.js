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

module.exports = {
  loginValidation,
  userValidation,
  nameValidation,
};