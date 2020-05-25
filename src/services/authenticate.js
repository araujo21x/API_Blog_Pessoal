const jwt = require('jsonwebtoken');
require('dotenv/config');

exports.genToken = idUser => {
    return jwt.sign({ id: idUser }, process.env.SECRET, { expiresIn: 86400 });
}

exports.verifyToken = token => {
    return new Promise((resolver,reject)=> {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err) reject(`token invalido`)
            resolver(decoded.id);
        });
    })
    
}