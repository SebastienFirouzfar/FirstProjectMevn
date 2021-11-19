const express = require('express')
const studentRoute = express.Router()

//studentModel 
const StudentModel = require("../models/Student")

//Get All data
studentRoute.get('/', (req, res, next) => {
    StudentModel.find((error, data) => {
        if(error){
            return next(error); 
        }else{
            res.json(data)
        }
    })
})

//create student data
studentRoute.post('/create-student', (req, res, next) => {
    StudentModel.create((req.body, (error, data) => {
        if(error){
            return next(error); 
        }else{
            res.json(data)
        }
    }))
})

studentRoute.get('/edit-student/:id', (req, res, next) => {
    StudentModel.findById(req.params.id, (error, data) => {
        if(error){
            return next(error); 
        }else{
            res.json(data)
        }
    })
})

studentRoute.put('/update-student/:id', (req, res,next)=>{
    StudentModel.findByIdAndUpdate(req.params.id, {
        $set : req.body
    }, (error, data)=>{
        if(error){
            return next(error); 
        }else{
            res.json(data)
            console.log('Student successfully updated')
        }
    })
})

//Delete student data
studentRoute.delete('/delete-student/:id', (req, res, next)=>{
    StudentModel.findByIdAndDelete(req.params.id,(error, data)=>{
        if(error){
            return next(error); 
        }else{
            res.status(200).json({
                msg : data
            })
        }
    })
})