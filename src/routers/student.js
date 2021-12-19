const express = require("express");
const router = new express.Router();
const Student = require("../models/students");

//2:we need to Define Router..
router.get("/tarun",(req,res) => {
    res.send("hello router is define");
});


//create data using async and await..
router.post("/students",async(req,res) =>{
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }catch(e){
        res.status(400).send(e);
    }    
})
//read data using async and await.. 
 router.get("/students",async(req,res) =>{
    try{
        const studentsData = await Student.find();
        res.status(201).send(studentsData);
    }catch(e){
        res.status(400).send(e);
    }    
})  
//read specific data using async and await.. 
  router.get("/students/:id",async(req,res) =>{
    try{
        const _id =req.params.id;
        const studentData = await Student.findById(_id);
           if(!studentData){
               return res.status(404).send();
           }else{
               res.status(201).send(studentData);
           }
    }catch(e){
        res.status(500).send(e);
    }    
})  
//update data by id using async and await.. 
 router.patch("/students/:id",async(req,res) =>{
    try{
        const _id =req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id,req.body,{
            new:true
        });
               res.status(201).send(updateStudent);
    }catch(e){
        res.status(400).send(e);
    }    
})
//Delete data by id using async and await.. 
 router.delete("/students/:id",async(req,res) =>{
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id); 
        if(!req.params.id){
            return res.status(404).send();
        }else{
            res.status(410).send(deleteStudent);
        }
    }catch(e){
        res.status(400).send(e);
    }    
})


module.exports =router;