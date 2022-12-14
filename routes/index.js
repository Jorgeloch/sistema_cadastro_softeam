const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    return response.send({message: "tudo ok com o metodo GET da raiz"});
});

router.post('/', (request, response) => {
    return response.send({message: "tudo ok com o metodo POST da raiz"});
});

module.exports = router;