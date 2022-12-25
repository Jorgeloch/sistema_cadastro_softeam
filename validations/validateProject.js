const Joi = require('joi');

const projectSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(), 
    status: Joi.string().required(), 
    value: Joi.string().pattern(new RegExp('/^([R][\$])?[\d]{1,3}(?:[\.][\d]{3})+([\,][\d]{2})?$/')).required(), 
    collaborators: Joi.array().items(Joi.string().pattern(new RegExp('/^[A-Fa-f0-9]{24}$/'))),
    companies: Joi.array().items(Joi.string().pattern(new RegExp('/^[A-Fa-f0-9]{24}$/')))
});

const validate = (schema) => (payload) => {
    return schema.validate(payload, {abortEarly: false});
}

const validateProject = validate(projectSchema);

module.exports = validateProject;