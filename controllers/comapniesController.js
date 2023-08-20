const Companies = require('../models/company');
const validateCompany = require('../validations/validateCompany');

const getCompanies = async (request, response) => {
    try {
        const company = await Companies.find({});
        return response.send(company);
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to get companies: ${err}` });
    }
}

const createCompany = async (request, response) => {
    const {error, value} = await validateCompany(request.body);
    if (error) return response.status(400).send({ error: `error trying to validate company: ${error.details}` });
    
    try {
        const { CNPJ } = request.body;
        if(await Companies.findOne({CNPJ})) return response.status(400).send({ error: 'Company already exist!' });

        const createdCompany = await Companies.create(request.body);
        return response.status(201).send(createdCompany);
    }
    catch (err){
        return response.status(500).send({ error: `Error trying to create company: ${err}` });
    }
}

const updateCompanyByID =  async (request, response) => {
    const {_id} = request.params;
    const { name, address, CNPJ, phone } = request.body;

    if(!_id) return response.status(400).send({ error: "Insuficient Data!" });
    try {
        if(!(await Companies.findById(_id))) return response.status(404).send({ error:"Company not found" });
        const updatedCompany = await Companies.findByIdAndUpdate(_id, {name, address, CNPJ, phone}, {new: true});
        return response.send(updatedCompany);
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to update company phone's number: ${err}`});
    }
}

const deleteCompany = async (request, response) => {
    const {_id} = request.query;

    if(!_id) return response.status(400).send({ error: "Insuficient Data!"});
    try {
        const deletedCompany = await Companies.findByIdAndDelete(_id);

        if(!deletedCompany) return response.status(404).send({error: "Company not found!"});
        
        return response.send(deletedCompany)
    }
    catch (err){
        return response.status(500).send({ error: `Error trying to delete company: ${err}` });
    }
}

module.exports = {
    getCompanies,
    createCompany,
    updateCompanyByID, 
    deleteCompany
}