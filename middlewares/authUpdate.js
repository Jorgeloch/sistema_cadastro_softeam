const jwt = require('jsonwebtoken');
const config = require('../config-data/config');
const Collaborators = require('../models/collaborator');

const authUpdate = async (request, response, next) => {
    const {_id} = request.params;
    const authHeader = request.headers.authorization;

    if(!authHeader) return response.status(401).send({ error:"Token wasn't sent" });

    if(!authHeader.startsWith("Bearer ")){
        return response.status(401).send({ error:"Token wasn't sent" });
    }
    else{
        const token = authHeader.substring(7, authHeader.length);
        const collaborator = await Collaborators.findById(_id);

        jwt.verify(token, config.JWTPassword, (err, decoded) => {
            if (err) return response.status(401).send({ error: `Error trying to verify token: ${err}`});
            if(decoded.id != collaborator._id) return response.status(401).send({ error: "unauthorized to modify this collaborator's password" });

            response.locals.authData = decoded;
            
            return next();
        });
    }
} 

module.exports = authUpdate;