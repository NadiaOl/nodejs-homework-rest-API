import Joi from "joi";
import { emailRegexp } from "../constans/user-constans.js";

const userSingUpSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
})

const userSinginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
})

const updateAvatarSchema = Joi.object({
    avatar: Joi.string()
    })

const userEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        'any.required': `Missing required field email`
      })
    
})

export default {
    userSingUpSchema,
    userSinginSchema,
    updateAvatarSchema,
    userEmailSchema,
}