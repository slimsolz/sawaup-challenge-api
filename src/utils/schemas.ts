import Joi from "joi";

export const SkillSchema = Joi.object({
  name: Joi.string().required().min(1).max(999),
});

export const CourseSchema = Joi.object({
  name: Joi.string().required().min(1).max(999),
  url: Joi.string().required().min(1).max(999),
  thumbnail: Joi.string().required().min(1).max(999),
  skills: Joi.array().items(Joi.number()).required(),
});
