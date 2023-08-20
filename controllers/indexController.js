const getIndex = (request, response) => {
    return response.send({message: "tudo ok com o metodo GET da raiz"});
} 

const postIndex = (request, response) => {
    return response.send({message: "tudo ok com o metodo POST da raiz"});
}

module.exports = {
    getIndex,
    postIndex
}