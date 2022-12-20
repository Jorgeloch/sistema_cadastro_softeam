const express = require('express');
const router = express.Router();
const Projects = require('../models/project')
const auth = require('../middlewares/auth')

router.get('/', auth, async (request, response) => {
    try{
        const projects = await Projects.find({});
        return response.send(projects);
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to get projects: ${err}` });
    }
});

router.post('/create', auth, async (request, response) => {
    const { name, description, status, value, collaborators, companies } = request.body;

    if (!name || !description || !status || !value || !collaborators || !companies) {
        return response.status(400).send({ error: "Insufficient Data!" });
    };

    try {
        if(await Projects.findOne({name})) return response.status(400).send({ error: 'Project already exist!' });

        const createdProject = await Projects.create(request.body);
        return response.status(201).send(createdProject);
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to create project: ${err}` });
    }
});

router.delete('/delete', auth, async (request, response) => {
    const {name} = request.body;
    if(!name) return response.status(400).send({ error: "Insuficient Data!"});
    try {
        const deletedProject = await Projects.findOneAndDelete({name});
        return response.send(deletedProject)
    }
    catch (err){
        return response.status(500).send({ error: `Error trying to delete project: ${err}` });
    }
});

module.exports = router;