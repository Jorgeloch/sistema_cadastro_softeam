const express = require('express');
const Companies = require('../models/company')
const router = express.Router();

router.get('/', (request, response) => {
    Companies.find({}, (err, data) => {
        if (err) return response.send({ error: `Error trying to connect to the database: ${err}` });
        return response.send(data);
    })
});

router.post('/create', (request, response) => {
    const { id, name, address, CNPJ, phone } = request.body;

    if (!id || !name || !address || !CNPJ || !phone) return response.send({ error: "Insufficient Data!" });

    Companies.findOne({id}, (err, data) => {
        if (err) return response.send({ error: `Error trying to find company: ${err}` });
        if (data) return response.send({ error: 'Company already exist!' });

        Companies.create(request.body, (err, data) => {
            if (err) return response.send({ error: `Error trying to create company: ${err}`});
            return data;
        });
    });
});

module.exports = router;