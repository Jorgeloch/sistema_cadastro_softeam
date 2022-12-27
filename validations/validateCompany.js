const Joi = require('joi');

const companySchema = Joi.object({
    name: Joi.string().required(),
    address: {
        country: Joi.string().max(2).required(),
        state: Joi.string().max(2).required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        location: Joi.number().required(),
        zipCode: Joi.string().regex(/^[\d]{5}[-]?[\d]{3}$/).required(),
        complement: Joi.string()
    },
    CNPJ: Joi.string().regex(/^[\d]{2}[\.]?[\d]{3}[\.]?[\d]{3}[\/]?[\d]{4}[-]?[\d]{2}$/).required(),
    phone: Joi.string().regex(/^[(]?[\d]{2,3}[)]?[9]?[\d]{4}[-]?[\d]{4}$/).required()
});

const validate = (schema) => (payload) => {
    return schema.validate(payload, {abortEarly: false});
}

const validateCompany = validate(companySchema);

module.exports = validateCompany;