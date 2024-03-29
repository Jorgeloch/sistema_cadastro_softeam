const Collaborators = require('../models/collaborator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const validateCollaborator = require('../validations/validateCollaborator');

dotenv.config();

const createUserToken = (userID) => {
    return jwt.sign({ id: userID }, process.env.JWTPassword, { expiresIn: process.env.JWTExpiresIn });
}

const getCollaborators = async (request, response) => {
    try{
        const collaborators = await Collaborators.find({});
        return response.send(collaborators);
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to get collaborators: ${err}` });
    }
}

const createCollaborator = async (request, response) => {
    const {error, value} = await validateCollaborator(request.body);
    if (error) return response.status(400).send({ error: `error trying to validate collaborator: ${error.details}` });

    try {
        const { email } = request.body;
        if(await Collaborators.findOne({email})) return response.status(400).send({ error: 'Collaborator already exist!' });

        const createdCollaborator = await Collaborators.create(request.body);
        createdCollaborator.password = undefined;

        return response.status(201).send({ createdCollaborator, token: createUserToken(createdCollaborator.id)});
    }
    catch (err) {
        return response.status(500).send( { error: `Error trying to create collaborator: ${err}` } );
    }
}

const authCollaborator = async (request, response) => {

    const {email, password} = request.body

    if (!email || !password) return response.status(400).send({ error: "Insuficient Data!" });

    try {
        const collaborator = await Collaborators.findOne({email}).select('+password');

        if (!collaborator) return response.status(404).send({ error: "Collaborator not found!" });

        const pass_ok = await bcrypt.compare(password, collaborator.password);
        if (!pass_ok) return response.status(401).send( { error: "Invalid Password!" } );

        collaborator.password = undefined;
        return response.send({ collaborator, token: createUserToken(collaborator.id) });
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to authenticate a collaborator: ${err}` });
    }

}

const updateCollaboratorByID = async (request, response) => {
    const { _id } = request.params;
    const { name, email, role } = request.body;
    if(!_id) return response.status(400).send({ error: "Insuficient Data!" });
    try {
        if(!(await Collaborators.findById(_id))) return response.status(404).send({ error:"Collaborator not found" });
        const updatedCollaborator = await Collaborators.findByIdAndUpdate(_id, { name, email, role }, { new: true });
        return response.send(updatedCollaborator);
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to update Collaborator's role: ${err}`});
    }
}

const updateCollaboratorPassword = async (request, response) => {
    const {_id} = request.params;
    const { oldPassword, newPassword } = request.body;

    if (!_id || !oldPassword || !newPassword) return response.status(400).send({ error: "Insuficent Data!" });

    try {
        const collaborator = await Collaborators.findById(_id).select('+password');

        if(!collaborator) return response.status(404).send({ error: "Collaborator not found" });
        if(!(bcrypt.compare(oldPassword, collaborator.password))) response.status(401).send({ error: "Invalid Password"});

        collaborator.password = newPassword;
        await collaborator.save();
        collaborator.password = undefined;

        return response.send(collaborator);
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to update Collaborator's role: ${err}`});
    }
}

const deleteCollaborator = async (request, response) => {
    const {_id} = request.query;
    if(!_id) return response.status(400).send({ error: "Insuficient Data!"});
    try {
        const deletedCollaborator = await Collaborators.findOneAndDelete({_id});

        if(!deletedCollaborator) return response.status(404).send({error: "Collaborator not found!"});

        deletedCollaborator.password = undefined;
        return response.send(deletedCollaborator);
    }
    catch (err){
        return response.status(500).send({ error: `Error trying to delete collaborator: ${err}` });
    }
}

module.exports = {
    getCollaborators,
    createCollaborator,
    authCollaborator,
    updateCollaboratorByID,
    updateCollaboratorPassword,
    deleteCollaborator
}