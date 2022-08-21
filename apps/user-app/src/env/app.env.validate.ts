import * as Joi from 'joi';

export const appEnvironmentValidate = Joi.object({
  APP_NAME: Joi.string().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  MONGO_HOST_URL: Joi.string().required(),
  MONGO_DB_NAME: Joi.string().required(),
});
