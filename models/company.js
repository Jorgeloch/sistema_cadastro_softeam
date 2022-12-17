const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, uppercase: true },
    address: { type: String, required: true, unique: true,  lowercase: true }, 
    CNPJ: { type: Number, required: true, select: false }, 
    phone: { type: Number, required: true }
});

module.exports = mongoose.model('Company', companySchema);