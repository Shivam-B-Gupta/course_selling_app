const {Router} = require('express');
const adminRouter = Router();
const jwt = require('jsonwebtoken')
const {adminModel, CourseModel} = require('../db');
const {JWT_ADMIN_PASSWORD } = require('../config')
const { adminMiddleware } = require('../middlewares/admin');

adminRouter.post('/signup', async function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    await adminModel.create({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
    })
    res.json({
        message: "you are signed up"
    })
})

adminRouter.post('/signin', function(req, res){
    const email = req.body.email;
    const password = req.body.password;

     const admin = adminModel.findOne({
        email: email,
        password: password
    })

    if(admin){
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD)

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

adminRouter.post('/course', adminMiddleware, async function(req, res){
    const adminId = req.adminId
    const {title, description, price, imageURL} = req.body;

    await CourseModel.create({
        title: title,
        description: description,
        price: price,
        imageURL: imageURL,
        creatorID: adminId
    })
    res.json({
        message: "created a new course"
    })
})

adminRouter.put('/', adminMiddleware, async function(req, res){
    const adminId = req.adminId;

    const {title, description, price, imageURL, courseId} = req.body;

    const course = await CourseModel.updateOne({
        _id: courseId,
        creatorID: adminId 
    },{
        title: title,
        description: description,
        price: price,
        imageURL: imageURL
    })
    res.json({
        message: "course updated",
        courseId: course._id
    })
})

adminRouter.post('.course/bulk', adminMiddleware, async function(req, res){
    const adminId = req.adminId;

    const courses = await CourseModel.find({
        creatorID: adminId
    })

})

module.exports ={
    adminRouter : adminRouter
}