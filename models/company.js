const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: { type: String, required: true, uppercase: true },
    address: { 
        country: { type: String, required: true, uppercase: true },
        state: { type: String, required: true, uppercase: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        location: { type: Number, required: true },
        zipCode: { type: String, required: true },
        complement: { type: String }
    }, 
    CNPJ: { type: String, required: true, unique: true, select: false }, 
    phone: { type: String, required: true }
});

module.exports = mongoose.model('Company', companySchema);