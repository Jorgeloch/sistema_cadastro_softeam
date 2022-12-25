const jwt = require('jsonwebtoken');
const config = require('../config-data/config')

const auth = (request, response, next) => {
    const tokenHeader = request.headers.auth;

    if(!tokenHeader) return response.status(401).send({ error:"Token wasn't sent" });
    jwt.verify(tokenHeader, config.JWTPassword, (err, decoded) => {
        if (err) return response.status(401).send({ error: `Error trying to verify token: ${err}`});
        response.locals.authData = decoded;
        return next();
    });
} 

module.exports = auth;