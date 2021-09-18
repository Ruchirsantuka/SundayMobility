const jwt = require('jsonwebtoken')
const config = require('../config.json');

const authenticateJWT = (req, res, next) => {  
    const authHeader = req.headers.authorization;
    if (authHeader) {   
        const token = authHeader.split(' ')[1];
        jwt.verify(token, config.secret, (error, user) => {
            if (error) {          
                return res.status(403).send(error);        
            }        
            req.user = user;        
            next();    
        });  
    }   
    else 
    {    
        return res.status(401).send("User is unauthorized");  
    }
};

module.exports = authenticateJWT