import Joi from "joi";

export const SkillSchema = Joi.object({
  name: Joi.string().required().min(1).max(999),
});
