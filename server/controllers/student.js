const express  = require('express');
const db = require("../mongo.js")
const router   = express.Router();
const util = require("util")
require("dotenv").config()
const bluebird = require("bluebird")
const exec = util.promisify(require('child_process').exec);
const fs = bluebird.promisifyAll(require("fs-extra"))
const _= require("lodash")
//const dJSON = require('dirty-json');




router.get('/students/:studentId',  async (req, res) => {
  try {
    const studentId = req.params.studentId
    const currentStudentId = req.currentStudentId
    //console.log(studentId)
    //console.log(currentStudentId)
    if ( studentId == req.currentStudentId || currentStudentId == 1000) {
      const student = await db.student.findOne({studentId}).populate('kelases')   
      console.log(student.kelases)
      res.json(student)
    } else {
      res.sendStatus(401)
    }
  } catch (e) {
    console.log(e)
    res.sendStatus(500);
  }
})

  // technicallly should be patch
  router.put('/students/:_id',  async(req,res) => {
    try {
      const currentStudentId = req.currentStudentId
      let savedStudent = await db.student.findById(req.params._id)
      // Admin code
      if ( savedStudent.studentId == currentStudentId || currentStudentId == 1000 ) {
        //student['darsId'] = req.body.darsId 
        //await student.save()
        console.log(req.body)
        savedStudent = req.body
        await db.student.updateOne({_id:savedStudent._id}, req.body )
        //await savedStudent.save()
        res.sendStatus(200)
      } else {
        res.sendStatus(401)
      }
    } catch (e) {
       console.log(e)
      res.sendStatus(500);
    }
  })

  router.get('/students', async (req, res) => {
    try {
      const noFilterClass = req.query.noFilterClass
      const kelasIndex = req.query.kelasIndex || 0
      console.log(req.query)
      const currentStudentId = req.currentStudentId
      let students
      if ( !noFilterClass || currentStudentId == 1000 ) {
        if ( noFilterClass ) {
          students = await db.student.find({})   
          console.log("Got All Students")
        } else {
          console.log(currentStudentId)
          const myself = await db.student.findOne({studentId:currentStudentId}).populate('kelases')   
          console.log("Filtering for: " + myself.kelases[kelasIndex] )
          students = await db.student.find({kelases : myself.kelases[kelasIndex] })
        }
        res.json(students)
      } else {
        res.sendStatus(401);
      }
    } catch (e) {
      console.log(e)
      res.sendStatus(500);
    }
  })

  router.delete('/students/:id', async (req, res) => {
    try {
      const _id = req.params.id
      
      const currentStudentId = req.currentStudentId
      if ( currentStudentId == 1000 ) {
        const student = await db.student.findById(_id)   
        console.log("Delete student with id: " + _id)
        await db.student.deleteOne({_id})
        res.sendStatus(200)
      } else {
        res.sendStatus(401);
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
