const express = require('express');
const Collaborators = require('../models/collaborator');
const router = express.Router();
const bcrypt = require('bcrypt')


router.get('/', async (request, response) => {
    try{
        const collaborators = await Collaborators.find({});
        return response.send(collaborators);
    }
    catch (err) {
        return response.send({ error: `Error trying to get collaborators: ${err}` });
    }
});

router.post('/create', async (request, response) => {
    const { id, name, email, password, role } = request.body;

    if (!id || !name || !email || !password || !role) {
        return response.send({ error: "Insufficient Data!" });
    }

    try {
        if(await Collaborators.findOne({id})) return response.send({ error: 'Collaborator already exist!' });

        const createdCollaborator = Collaborators.create(request.body);
        createdCollaborator.password = undefined;

        return response.send(createdCollaborator);
    }
    catch (err) {
        return response.send( { error: `Error trying to create collaborator: ${err}` } );
    }

});

router.post('/auth', async (request, response) => {
    const {email, password} = request.body

    if (!email || !password) return response.send({ error: "Insuficient Data!" });

    try {
        const collaborator = Collaborators.findOne({email}).select('+password');
        if (!collaborator) return response.send({ error: "Collaborator not found!" });

        const pass_ok = await bcrypt.compare(password, collaborator.password);
        if (!pass_ok) return response.send( { error: "Invalid Password!" } );

        collaborator.password = undefined;
        return collaborator
    }
    catch (err) {
        return response.send({ error: `Error trying to authenticate a collaborator: ${err}` });
    }

});

router.delete('/delete', async (request, response) => {
    const {id} = request.body;
    try {
        const deletedCollaborator = await Collaborators.findOneAndDelete({id});
        return response.send(deletedCollaborator)
    }
    catch (err){
        return response.send({ error: `Error trying to delete collaborator: ${err}` });
    }
});

module.exports = router;