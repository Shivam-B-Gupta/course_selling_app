const jwt = require('jsonwebtoken');
const {JWT_USER_PASSWORD} = require('../config');

function userMiddleware(req, res, next){
    const token = req.body.token;

    if(!token){
        return res.status(403).json({mssg: "token missing"})
    }
    
    try{
        const decoded = jwt.verify(token, JWT_USER_PASSWORD)
        req.userId = decoded.id
        next()
    }
    catch(err){
        res.status(403).json({
            message: "you are not sign in"
        })
    }
}

module.exports ={
    userMiddleware: userMiddleware
}