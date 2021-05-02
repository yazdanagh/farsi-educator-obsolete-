const express  = require('express');
const router   = express.Router();
const util = require("util")
require("dotenv").config()
const bluebird = require("bluebird")
const exec = util.promisify(require('child_process').exec);
const fs = bluebird.promisifyAll(require("fs-extra"))
const _= require("lodash")
//const dJSON = require('dirty-json');
const db = require("../mongo.js")




router.get('/students/:studentId',  async (req, res) => {
    const studentId = req.studentId
    const students = await db.student.find({studentId})   
	  const student = students[0]
    console.log(student)
    //console.log(req.params)
    //const student = doAuth(code,email,students.students)
    //    console.log(student)
    if ( student ) {
      console.log("FOUND" + student)
      res.json(student)
    } else {
      res.sendStatus(404);
    }
  })

  // technicallly should be patch
  router.put('/students/:_id',  async(req,res) => {
    try {
      const studentId = req.studentId
      let savedStudent = await db.student.findById(req.params._id)
      // Admin code
      if ( savedStudent.studentId == studentId || studentId == 1000 ) {
        //student['darsId'] = req.body.darsId 
        //await student.save()
        console.log(req.body)
        savedStudent = req.body
        await db.student.updateOne({_id:savedStudent._id}, req.body )
        //await savedStudent.save()
        res.sendStatus(200)
      } else {
        res.sendStatus(404)
      }
    } catch (e) {
       console.log(e)
      res.sendStatus(500);
    }
  })

  router.get('/students', async (req, res) => {
    const students = await db.student.find({})   
    if ( students ) {
      console.log("Got All Students")
      res.json(students)
    } else {
      res.sendStatus(404);
    }
  })

  router.delete('/students/:id', async (req, res) => {
    try {
      const _id = req.params.id
      const student = await db.student.findById(_id)   
      if ( student ) {
        console.log("Delete student with id: " + _id)
        await db.student.deleteOne({_id})
        res.sendStatus(200)
      } else {
        res.sendStatus(404);
      }
    } catch (e) {
      console.log(e)
      res.sendStatus(500)
    }
  })


  router.post('/students', async (req, res) => {
    try {
      const student = req.body.student
      console.log("Create student: " + student.name)
      const maxStuId = (await db.student.find().sort({studentId:-1}).limit(1))[0].studentId
      console.log(maxStuId)
      student.studentId = maxStuId + 1
      await db.student.create(student)
      const students = await db.student.find({})
      res.json(students)
    } catch (e) {
      console.log(e)
      res.sendStatus(500)
    }
  })


module.exports = router
