const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    return response.send({message: "tudo ok com o metodo GET da rota de empresas"});
});

router.post('/', (request, response) => {
    return response.send({message: "tudo ok com o metodo POST da rota de empresas"});
});

module.exports = router;