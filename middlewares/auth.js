const jwt = require('jsonwebtoken');
const config = require('../config-data/config')

const auth = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if(!authHeader) return response.status(401).send({ error:"Token wasn't sent" });

    if(!authHeader.startsWith("Bearer ")){
        return response.status(401).send({ error:"Token wasn't sent" });
    }
    else{
        const token = authHeader.substring(7, authHeader.length);

        jwt.verify(token, config.JWTPassword, (err, decoded) => {
            if (err) return response.status(401).send({ error: `Error trying to verify token: ${err}`});
            response.locals.authData = decoded;
            return next();
        });
    }
} 

module.exports = auth;