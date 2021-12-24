const Joi = require('@hapi/joi')

//Registration Validation
exports.registrationValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(50).trim().required(),
        email: Joi.string().email().trim().lowercase().required(),
        password: Joi.string().min(6).trim().required(),
    })
    return schema.validate(data)
}

exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().trim().lowercase().required(),
        password: Joi.string().min(6).trim().required(),
    })
    return schema.validate(data)
}
