const { Router } = require('express');

const courseRoutes = Router();

courseRoutes.post('/course/purchase', function(req, res){
    res.json({
        message: ""
    })
})

courseRoutes.get('/course/preview', function(req, res){
    res.json({
        message: ""
    })
})

module.exports ={
    courseRoutes: courseRoutes
}