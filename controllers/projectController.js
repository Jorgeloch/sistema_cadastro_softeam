const validateProject = require('../validations/validateProject')
const Projects = require('../models/project')

const getProjects = async (request, response) => {
    try{
        const projects = await Projects.find({}).populate('collaborators').populate('companies');
        return response.send(projects);
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to get projects: ${err}` });
    }
}

const createProject = async (request, response) => {
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
}

const updateProjectByID = async (request, response) => {
    const { _id } = request.params;
    const { name, description, status, value, collaborators, companies} = request.body;

    if(!_id) return response.status(400).send({ error: "Insuficient Data!" });
    try {
        if (!(await Projects.findById(_id))) return response.status(404).send(({ error: "Project not found" }));
        const updatedProject = await Projects.findByIdAndUpdate(_id, {name, description, status, value, collaborators, companies}, {new: true}).populate('collaborators').populate('companies');
        response.send(updatedProject);
    } 
    catch (err) {
        return response.status(500).send({ error: `Error trying to update project status: ${err}` });
    }
}

const deleteProject = async (request, response) => {
    const {_id} = request.query;
    if(!_id) return response.status(400).send({ error: "Insuficient Data!"});
    try {
        const deletedProject = await Projects.findByIdAndRemove(_id).populate('collaborators').populate('companies');

        if(!deletedProject) return response.status(404).send({error: "Project not found!"});
        
        return response.send(deletedProject);
    }
    catch (err){
        return response.status(500).send({ error: `Error trying to delete project: ${err}` });
    }
}

module.exports = {
    getProjects,
    createProject,
    updateProjectByID,
    deleteProject
}