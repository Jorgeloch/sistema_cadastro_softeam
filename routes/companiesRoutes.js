const express = require('express');
const Companies = require('../models/company');
const router = express.Router();
const auth = require('../middlewares/auth')
const validateCompany = require('../validations/validateCompany')

router.get('/', auth, async (request, response) => {
    try {
        const company = await Companies.find({});
        return response.send(company);
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to get companies: ${err}` });
    }
});

router.post('/create', auth, async (request, response) => {
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
});

router.put('/update/:_id',auth, async (request, response) => {
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
});

router.delete('/delete', auth, async (request, response) => {
    const {_id} = request.query;

    if(!_id) return response.status(400).send({ error: "Insuficient Data!"});
    try {
        const deletedCompany = await Companies.findByIdAndDelete(_id);
        return response.send(deletedCompany)
    }
    catch (err){
        return response.status(500).send({ error: `Error trying to delete company: ${err}` });
    }
});

module.exports = router;