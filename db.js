const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL)
console.log('connected sucessfully')
const schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String
})

const Course = new schema({
    title: String,
    description: String,
    price: Number,
    imageURL: String,
    creatorID: ObjectId
})

const admin = new schema({
    email:{type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String     
});

const purchase = new schema({
    userId : ObjectId,
    courseID: ObjectId
})

const userModel = mongoose.model("user", User);
const CourseModel =  mongoose.model("course", Course);
const adminModel = mongoose.model("admin", admin);
const purchaseModel = mongoose.model("purchase", purchase);

module.exports = {
    userModel,
    CourseModel,
    adminModel,
    purchaseModel
}