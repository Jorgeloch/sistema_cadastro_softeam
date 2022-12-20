const express = require('express');
const router = express.Router();
const Projects = require('../models/project')

router.get('/', async (request, response) => {
    try{
        const projects = await Projects.find({});
        return response.send(projects);
    }
    catch (err) {
        return response.send({ error: `Error trying to get projects: ${err}` });
    }
});

router.post('/create', async (request, response) => {
    const { id, name, description, status, value, collaborators, companies } = request.body;

    if (!id || !name || !description || !status || !value || !collaborators || !companies) {
        return response.send({ error: "Insufficient Data!" });
    };

    try {
        if(await Projects.findOne({id})) return response.send({ error: 'Project already exist!' });

        const createdProject = await Projects.create(request.body);
        return response.send(createdProject);
    }
    catch (err) {
        return response.send({ error: `Error trying to create project: ${err}` });
    }
});

router.delete('/delete', async (request, response) => {
    const {id} = request.body;
    try {
        const deletedProject = await Projects.findOneAndDelete({id});
        return response.send(deletedProject)
    }
    catch (err){
        return response.send({ error: `Error trying to delete project: ${err}` });
    }
});

module.exports = router;