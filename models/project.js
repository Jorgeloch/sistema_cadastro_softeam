const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: { type: String, required: true, uppercase: true },
    description: { type: String, required: false }, 
    status: { type: String, required: true }, 
    value: { type: Number, required: true }, 
    collaborators: [{ type: Schema.Types.OjectId, ref: "Collaborator"}],
    companies: [{ type: Schema.Types.OjectId, ref: "Company"}]
});

module.exports = mongoose.model('Project', projectSchema);