const express =  require('express');
const mongoose = require('mongoose')

const {userRoutes} = require("./routes/user");
const { courseRoutes } = require('./routes/course');
const {adminRouter} = require('./routes/admin')
const app = express();

app.use(express.json());
app.use('/user', userRoutes);
app.use('/course', courseRoutes);
app.use('/admin', adminRouter);


app.listen(3000);