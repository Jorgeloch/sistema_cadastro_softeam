const Joi = require('joi');

const collaboratorSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().required()
});

const validate = (schema) => (payload) => {
    return schema.validate(payload, {abortEarly: false});
}

const validateCollaborator = validate(collaboratorSchema);

module.exports = validateCollaborator;