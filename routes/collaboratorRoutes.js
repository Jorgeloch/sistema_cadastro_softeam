const express = require('express');
const Collaborators = require('../models/collaborator');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')
const config = require('../config-data/config')
const validateCollaborator = require('../validations/validateCollaborator')

const createUserToken = (userID) => {
    return jwt.sign({ id: userID }, config.JWTPassword, { expiresIn: config.JWTExpiresIn });
}


router.get('/', auth, async (request, response) => {
    try{
        const collaborators = await Collaborators.find({});
        return response.send(collaborators);
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to get collaborators: ${err}` });
    }
});

router.post('/create', auth, async (request, response) => {
    const {error, value} = await validateCollaborator(request.body);
    if (error) return response.send(error.details);

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

});

router.post('/auth', async (request, response) => {
    const {email, password} = request.body

    if (!email || !password) return response.status(400).send({ error: "Insuficient Data!" });

    try {
        const collaborator = await Collaborators.findOne({email}).select('+password');
        if (!collaborator) return response.status(400).send({ error: "Collaborator not found!" });

        const pass_ok = await bcrypt.compare(password, collaborator.password);
        if (!pass_ok) return response.status(401).send( { error: "Invalid Password!" } );

        collaborator.password = undefined;
        return response.send({ collaborator, token: createUserToken(collaborator.id)});
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to authenticate a collaborator: ${err}` });
    }

});

router.post('/updateRole',auth, async (request, response) => {
    const {email, role} = request.body;
    if(!email || !role) return response.status(400).send({ error: "Insuficient Data!" });
    try {
        if(!(await Collaborators.findOne({email}))) return response.status(404).send({ error:"Collaborator not found" });
        const updatedCollaborator = await Collaborators.findOneAndUpdate({email}, {role}, {new: true});
        return response.send(updatedCollaborator);
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to update Collaborator's role: ${err}`});
    }
});

router.delete('/delete', auth, async (request, response) => {
    const {email} = request.body;
    if(!email) return response.status(400).send({ error: "Insuficient Data!"});
    try {
        const deletedCollaborator = await Collaborators.findOneAndDelete({email});
        deletedCollaborator.password = undefined;
        return response.send(deletedCollaborator);
    }
    catch (err){
        return response.status(500).send({ error: `Error trying to delete collaborator: ${err}` });
    }
});

module.exports = router;