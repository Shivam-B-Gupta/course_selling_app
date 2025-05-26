const jwt = require('jsonwebtoken');
const {JWT_ADMIN_PASSWORD} = require('../config');

function adminMiddleware(req, res, next){
    const auth = req.headers.authorization;

    if(!auth || !auth.startsWith("Bearer ")){
        return res.status(403).json({mssg: "token missing"})
    }
    const token = auth.split(" ")[1]
    try{
        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD)
        req.adminId = decoded.id
        next()
    }
    catch(err){
        return res.status(403).json({
            message: "you are not sign in"
        })
    }
}

module.exports = {
    adminMiddleware
}