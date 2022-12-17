const express = require('express');
const Collaborators = require('../models/collaborator');
const router = express.Router();

router.get('/', (request, response) => {
    Collaborators.find({}, (err, data) => {
        if (err) return response.send({ error: `Error trying to connect to the database: ${err}` });
        return response.send(data);
    })
});

router.post('/create', (request, response) => {
    const { id, name, email, password, role } = request.body;

    if (!id || !name || !email || !password || !role) return response.send({ error: "Insufficient Data!" });

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

module.exports = router;