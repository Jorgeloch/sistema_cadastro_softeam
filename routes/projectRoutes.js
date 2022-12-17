const express = require('express');
const router = express.Router();
const Projects = require('../models/project')

router.get('/', (request, response) => {
    Projects.find({}, (err, data) => {
        if (err) return response.send({ error: `Error trying to connect to the database: ${err}` });
        return response.send(data);
    })
});

router.post('/create', (request, response) => {
    const { id, name, description, status, value, collaborators, companies } = request.body;

    if (!id || !name || !description || !status || !value || !collaborators || !companies) return response.send({ error: "Insufficient Data!" });

    Projects.findOne({id}, (err, data) => {
        if (err) return response.send({ error: `Error trying to find project: ${err}` });
        if (data) return response.send({ error: 'Project already exist!' });

        Projects.create(request.body, (err, data) => {
            if (err) return response.send({ error: `Error trying to create project: ${err}`});
            data.password = undefined;
            return data;
        });
    });
});

module.exports = router;