const express = require('express');
const company = require('../models/company');
const Companies = require('../models/company')
const router = express.Router();

router.get('/', async (request, response) => {
    try {
        const company = Companies.find({});
        return response.send(company);
    }
    catch (err) {
        return response.send({ error: `Error trying to get companies: ${err}` });
    }
});

router.post('/create', async (request, response) => {
    const { id, name, address, CNPJ, phone } = request.body;

    if (!id || !name || !address || !CNPJ || !phone) {
        return response.send({ error: "Insufficient Data!" });
    };

    try {
        if(Companies.findOne({id})) return response.send({ error: 'Company already exist!' });

        const createdCompany = await Companies.create(request.body);
        return response.send(createdCompany);
    }
    catch (err){
        return response.send({ error: `Error trying to create company: ${err}` });
    }
});

router.delete('/delete', async (request, response) => {
    const {id} = request.body;
    try {
        const deletedCompany = await Companies.findOneAndDelete({id});
        return response.send(deletedCompany)
    }
    catch (err){
        return response.send({ error: `Error trying to delete company: ${err}` });
    }
});

module.exports = router;