const validators = require('./validators');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path')

function getKey() {
    const certPath = path.join(__dirname, '../keys/jwtRS256.key');
    const privateKey = fs.readFileSync(certPath, 'utf8');
    return privateKey.replace(/\\n/gm, '\n')
}

function generateToken(id) {
    return jwt.sign({id}, getKey(), {algorithm: 'RS256'});
}

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, getKey(), function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.user = decoded;
        next()
    });
}

module.exports = {
    validators,
    generateToken,
    verifyToken
}