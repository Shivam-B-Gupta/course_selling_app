const { Router } = require('express')
const {userModel, CourseModel, purchaseModel} = require('../db')
const jwt = require('jsonwebtoken')
const {z} = require('zod')
const  bcrypt  = require('bcrypt')
const userRoutes = Router();
const {JWT_USER_PASSWORD} = require('../config')
const { userMiddleware } = require('../middlewares/user')

userRoutes.post('/signup', async function (req, res){

    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(8).max(16),
        firstname: z.string().min(3).max(15),
        lastname: z.string().min(3).max(15)
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success){
        res.json({
            mssg: "Incorrect format"
        })
    }

    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const hashedPassword = await bcrypt.hash(password, 5);

    await userModel.create({
        email: email,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname
    })
    res.json({
        message: "signup successful"
    })
})

userRoutes.post('/signin', async function(req, res){
     const email = req.body.email;
        const password = req.body.password;
    
         const user = await userModel.findOne({
            email: email
        })

        if(!user){
            res.status(403).json({
                mssg: "user not found in the db"
            })
            return
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if(passwordMatch){
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

userRoutes.get('/purchases', userMiddleware, async function(req, res){
    const userId = req.userId;
    
    const purchases = await purchaseModel.find({
        userId,
    })

    let purchasedCourseIds = [];

    for(let i = 0; i < purchases.length; i++){
        purchasedCourseIds.push(purchases[i].courseID);
    }

    const coursedata = await CourseModel.find({
        _id: {$in: purchasedCourseIds}
    })

    res.json({
        purchases : purchases,
        coursedata: coursedata
    })
})

module.exports = {
    userRoutes: userRoutes
}