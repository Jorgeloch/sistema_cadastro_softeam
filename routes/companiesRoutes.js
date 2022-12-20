const express = require('express');
const Companies = require('../models/company');
const router = express.Router();
const auth = require('../middlewares/auth')

router.get('/', auth, async (request, response) => {
    try {
        const company = Companies.find({});
        return response.send(company);
    }
    catch (err) {
        return response.status(500).send({ error: `Error trying to get companies: ${err}` });
    }
});

router.post('/create', auth, async (request, response) => {
    
    const { name, address, CNPJ, phone } = request.body;
    if (!name || !address || !CNPJ || !phone) {
        return response.status(400).send({ error: "Insufficient Data!" });
    };
    
    try {
        if(await Companies.findOne({CNPJ})) return response.status(400).send({ error: 'Company already exist!' });

        const createdCompany = await Companies.create(request.body);
        return response.status(201).send(createdCompany);
    }
    catch (err){
        return response.status(500).send({ error: `Error trying to create company: ${err}` });
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