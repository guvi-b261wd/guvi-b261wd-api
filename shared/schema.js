const Joi = require("joi");

const schema = {
  registerSchema: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
  }),
  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
  }),
  postSchema: Joi.object({
    title: Joi.string().max(100).required(),
    body: Joi.string().max(250).required(),
  }),
};

module.exports = schema;
