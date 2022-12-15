const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collaboratorSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, uppercase: true },
    email: { type: String, required: true, unique: true,  lowercase: true }, 
    password: { type: String, required: true, select: false }, 
    role: { type: String, required: true }
});

module.exports = mongoose.model('Collaborator', collaboratorSchema);