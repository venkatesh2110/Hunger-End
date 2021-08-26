const jwt = require('jsonwebtoken');

function verifyToken(req,res,next) {
    if(!req.headers.authorization){
        return res.status(401).send('Un Authorized Request');
    }
    
    let token = req.headers.authorization.split(' ')[1] //Because Bearer in index [0]
    if(token === 'null'){
        return res.status(401).send('Un authorized Request');
    }
    let payload = jwt.verify(token,'secretKey');
    if(!payload){
        return res.status(401).send('Un-authorized Request');
    }
    req.userId = payload.subject;
    next();
}

module.exports = verifyToken;