const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, uppercase: true },
    description: { type: String, required: false }, 
    status: { type: String, required: true }, 
    value: { type: Number, required: true }, 
    collaborators: { type: Array, required: true },
    companies: { type: Array, required: true }
});

module.exports = mongoose.model('Project', projectSchema);