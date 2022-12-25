const Joi = require('joi');

const companySchema = Joi.object({
    name: Joi.string().required(),
    address: {
        country: Joi.string().max(2).required(),
        state: Joi.string().max(2).required(),
        city: Joi.string().required,
        street: Joi.string().required(),
        location: Joi.number().required,
        zipCode: Joi.string().required(),
        complement: Joi.string()
    },
    CNPJ: Joi.string().pattern(new Regexp('/^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/')).required(),
    phone: Joi.string().pattern(new Regexp('/^[(]?[0-9]{3}[)]?[9]?[0-9]{4}[-]?[0-9]{4}$/')).required()
});

const validate = (schema) => (payload) => {
    return schema.validate(payload, {abortEarly: false});
}

const validateCompany = validate(companySchema);

module.exports = validateCompany;