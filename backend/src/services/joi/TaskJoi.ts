import Joi from "joi";

export const CreateTaskSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
});

export const TaskIdSchema = Joi.number();
