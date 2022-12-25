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
    if (error) return response.send(error.details)
    
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

router.post('/updatePhone',auth, async (request, response) => {
    const {name, phone} = request.body;
    if(!name || !phone) return response.status(400).send({ error: "Insuficient Data!" });
    try {
        if(!(await Companies.findOne({name}))) return response.status(404).send({ error:"Company not found" });
        const updatedCompany = await Companies.findOneAndUpdate({name}, {phone}, {new: true});
        return response.send(updatedCompany);
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to update company phone's number: ${err}`});
    }
});

router.post('/updateAddress',auth, async (request, response) => {
    const {name, address} = request.body;
    if(!name || !address) return response.status(400).send({ error: "Insuficient Data!" });
    try {
        if(!(await Companies.findOne({name}))) return response.status(404).send({ error:"Company not found" });
        const updatedCompany = await Companies.findOneAndUpdate({name}, {address}, {new: true});
        return response.send(updatedCompany);
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to update company's address: ${err}`});
    }
});

router.delete('/delete', auth, async (request, response) => {
    const {CNPJ} = request.body;
    if(!CNPJ) return response.status(400).send({ error: "Insuficient Data!"});
    try {
        const deletedCompany = await Companies.findOneAndDelete({CNPJ});
        return response.send(deletedCompany)
    }
    catch (err){
        return response.status(500).send({ error: `Error trying to delete company: ${err}` });
    }
});

module.exports = router;