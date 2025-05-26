const { Router } = require('express')
const {userModel} = require('../db')
const jwt = require('jsonwebtoken')
const userRoutes = Router();
const {JWT_USER_PASSWORD} = require('../config')

userRoutes.post('/signup', async function (req, res){
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    await userModel.create({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
    })
    res.json({
        message: "signup endpoint"
    })
})

userRoutes.post('/signin', async function(req, res){
     const email = req.body.email;
        const password = req.body.password;
    
         const user = await userModel.findOne({
            email: email,
            password: password
        })
    
        if(user){
            const token = jwt.sign({
                id: user.id
            }, JWT_USER_PASSWORD)
            res.json({
                token: token
            })
        }
        else{
            res.status(403).json({
                message: "incorrect credentials"
            })
        }
    
})

userRoutes.get('/purchases', function(req, res){
    res.json({
        message: ""
    })
})

module.exports = {
    userRoutes: userRoutes
}