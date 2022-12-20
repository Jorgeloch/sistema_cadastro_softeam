const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const collaboratorSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, uppercase: true },
    email: { type: String, required: true, unique: true,  lowercase: true }, 
    password: { type: String, required: true, select: false }, 
    role: { type: String, required: true }
});

collaboratorSchema.pre('save', async function(next) {
    const collaborator = this;
    if (!collaborator.isModified('password')) return next();

    collaborator.password = await bcrypt.hash(collaborator.password, 10);
    return next()
});

module.exports = mongoose.model('Collaborator', collaboratorSchema);