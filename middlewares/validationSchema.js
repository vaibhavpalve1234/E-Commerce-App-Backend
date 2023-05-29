'use strict'
const Joi = require('joi')
module.exports = {
    validteSignupSchema: async(req, res, next)=>{
        try {
            const signUpSchema = Joi.object({
                firstname: Joi.string().regex(/^[a-zA-Z0-9]*$/).min(3).max(100).required(),
                lastname: Joi.string().regex(/^[a-zA-Z0-9]*$/).min(3).max(100),
                email: Joi.string().required(),
                password: Joi.string().pattern(/^[a-zA-Z0-9*&^%$#@!-_]{5,30}$/).required(),
            })
             await signUpSchema.validateAsync(req.body)
            next()
        } catch (error) {
            console.log(error)
            res.send(error.details[0].message, {}, 400)
        }
    }
}