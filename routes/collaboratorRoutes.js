const express = require('express');
const Collaborators = require('../models/collaborator');
const router = express.Router();
const bcrypt = require('bcrypt')

router.get('/', (request, response) => {
    Collaborators.find({}, (err, data) => {
        if (err) return response.send({ error: `Error trying to connect to the database: ${err}` });
        return response.send(data);
    })
});

router.post('/create', (request, response) => {
    const { id, name, email, password, role } = request.body;

    if (!id || !name || !email || !password || !role) {
        return response.send({ error: "Insufficient Data!" });
    }

    Collaborators.findOne({id}, (err, data) => {
        if (err) return response.send({ error: `Error trying to find collaborator: ${err}` });
        if (data) return response.send({ error: 'Collaborator already exist!' });

        Collaborators.create(request.body, (err, data) => {
            if (err) return response.send({ error: `Error trying to create collaborator: ${err}`});
            data.password = undefined;
            return response.send(data);
        });
    });
});

router.post('/auth', (request, response) => {
    const {email, password} = request.body

    if (!email || !password) return response.send({ error: "Insuficient Data!" });
    
    Collaborators.findOne({email}, (err, data) => {
        if (err) return response.send({ error: `Error trying to find a collaborator: ${err}`});
        if (!data) return response.send( { error: "Collaborator not found!" } );

        bcrypt.compare(password, data.password, (err, same) => {
            if (err) return response.send({ error: `Error trying to verify password: ${err}` });
            if (!same) return response.send( { error: "Invalid Password!" } );

            data.password = undefined;

            return response.send(data)

        });
    }).select('+password');
});

router.delete('/delete', (request, response) => {
    const {id} = request.body;
    Collaborators.findOneAndDelete({id}, (err, data) => {
        if(err) return response.send(`Error trying to delete collaborator: ${err}`);
        return response.send(data);
    });
});

module.exports = router;