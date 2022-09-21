var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const { response } = require('../app');
var StudentModel = require('../models/student.model');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("Students");
});

//Insert
router.post('/add', function(req, res, next) {
    console.log(req.body);
    let newStudent = StudentModel({
        firstName:req.body.firstname,
        lastName:req.body.lastname,
        age:req.body.age,
        dob:req.body.dob,
        course:req.body.course
    });
    newStudent.save(function(err,newStudent){
        if(err)
        {
            res.send(err);
        }else{
            res.send({message: 'User Added Successfully',studentObj: newStudent });
        }
    })
});

//getlist
router.get('/list',function(req,res){
    StudentModel.find(function(err,response){
        if(err){
            res.send(err);
        }else{
            res.send({status:200,message:'success',data:response});
        }
    });
});

//find datas
router.get('/searchByName',function(req,res){
    const searchname = req.query.firstName;
    StudentModel.find({firstName:searchname},function(err,response){
        if(err){
            res.send(err);
        }else{
            res.send({status:200,noOfResult:response.length,data:response});
        }
    });
});

router.get('/searchById',function(req,res){
    const searchIdQuery = req.query.id;
    StudentModel.findById(searchIdQuery,function(err,response){
        if(err){
            res.send(err);
        }else{
            res.send({status:200,data:response});
        }
    });
});

router.put('/updateUser',function(req,res){
    const id = req.query.userId;
    const fName = req.query.firstName;
    StudentModel.findByIdAndUpdate(id,{firstName:fName},function(err,response){
        if(err){
            res.send(err);
        }else{
            res.send({status:200,students:response});
        }
    });
});

router.delete('/deleteUser',function(req,res){
    const id = req.query.userId;
    StudentModel.findByIdAndDelete(id,function(err,response){
        if(err){
            res.send(err);
        }else{
            res.send({status:200,student:response});
        }
    })
})
module.exports = router;

