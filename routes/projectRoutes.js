const express = require('express');
const router = express.Router();
const Projects = require('../models/project')
const auth = require('../middlewares/auth')
const validateProject = require('../validations/validateProject')

router.get('/', auth, async (request, response) => {
    try{
        const projects = await Projects.find({}).populate('collaborators').populate('companies');
        return response.send(projects);
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to get projects: ${err}` });
    }
});

router.post('/create', auth, async (request, response) => {
    const {error, value} = validateProject(request.body);
    if(error) return response.status(400).send({ error: `error trying to validate project: ${error.details}` });

    try {
        const { name } = request.body;

        if(await Projects.findOne({name})) return response.status(400).send({ error: 'Project already exist!' });

        const createdProject = await (await (await Projects.create(request.body)).populate('collaborators')).populate('companies');
        return response.status(201).send(createdProject);
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to create project: ${err}` });
    }
});

router.post('/update', auth, async (request, response) => {
    const {name, status} = request.body;
    if(!name || !status) return response.status(400).send({ error: "Insuficient Data!" });
    try {
        if (!(await Projects.findOne({name}))) return response.status(404).send(({ error: "Project not found" }));
        const updatedProject = await Projects.findOneAndUpdate({name}, {status}, {new: true});
        response.send(updatedProject);
    } 
    catch (err) {
        return response.status(500).send({ error: `Error trying to update project status: ${err}` });
    }
});

router.delete('/delete', auth, async (request, response) => {
    const {_id} = request.body;
    if(!_id) return response.status(400).send({ error: "Insuficient Data!"});
    try {
        const deletedProject = await Projects.findByIdAndRemove(_id).populate('collaborators').populate('companies');
        return response.send(deletedProject)
    }
    catch (err){
        return response.status(500).send({ error: `Error trying to delete project: ${err}` });
    }
});

module.exports = router;