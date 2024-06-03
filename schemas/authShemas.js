import Joi from "joi";
import { emailRegexp } from "../constants/user-constants.js";

export const authSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

export const authEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});
