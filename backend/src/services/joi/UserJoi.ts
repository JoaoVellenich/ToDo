import Joi from "joi";

export const CreateUserSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .max(100)
    .regex(new RegExp("[a-zA-ZÀ-ÖØ-öø-ÿ]+")),
  email: Joi.string()
    .required()
    .min(5)
    .max(100)
    .email({ tlds: { allow: false } }),
  password: Joi.string()
    .required()
    .regex(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    )
    .min(8),
});
