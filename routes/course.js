const { Router } = require('express');
const { purchaseModel, CourseModel } = require('../db');

const courseRoutes = Router();

courseRoutes.post('/purchase', async function(req, res){
    const userId = req.userId;
    const courseID = req.body.courseID;

    await purchaseModel.create({
        userId: userId,
        courseID: courseID
    })
    res.json({
        message: "You have successfully bought the course"
    })
})

courseRoutes.get('/preview', async function(req, res){
    const courses = await CourseModel.find({})
    res.json({
        courses
    })
})

module.exports ={
    courseRoutes: courseRoutes
}