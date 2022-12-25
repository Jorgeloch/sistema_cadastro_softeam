const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: { type: String, required: true, uppercase: true },
    address: { type: Object, required: true, unique: true, lowercase: true }, 
    CNPJ: { type: Number, required: true, unitque: true, select: false }, 
    phone: { type: Number, required: true }
});

module.exports = mongoose.model('Company', companySchema);