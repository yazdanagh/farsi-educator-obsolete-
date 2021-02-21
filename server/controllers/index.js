'use strict'                                                                                                                                                   

//const defines = require("../../common/defines.js");

const util = require("util")
require("dotenv").config()
const bluebird = require("bluebird")
const exec = util.promisify(require('child_process').exec);
const fs = bluebird.promisifyAll(require("fs-extra"))
const _= require("lodash")
//const dJSON = require('dirty-json');
const db = require("../mongo.js")
const jwt = require("jsonwebtoken");


//const configFile = './students_new.config'

const middleware  = require('./middleware');

const authToken = async (req,res,next) => {
 
  console.log("Auth...")
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if ( token == null ) return res.sendStatus(401)
    try {
      const code = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
      console.log(code)
      req.code = code
      next()
    } catch (err) {
      res.sendStatus(403)
    }
}

module.exports = (app) => {

  app.post('/login', async (req, res) => {
     // Auth
     console.log("Hi")
     try {
       const code = req.body.code
       const email = req.body.email
       const student = await db.student.find({code,email}) 
       const accessToken = jwt.sign(code, process.env.ACCESS_TOKEN_SECRET )
       res.json({accessToken})
     } catch (e) {
       console.log(e)
       res.sendStatus(403)
     }
  })


  app.get('/main', authToken, async (req, res) => {
    const code = req.code
    const students = await db.student.find({code})   
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
  app.put('/students/:_id', authToken, async(req,res) => {
    try {
      const code = req.code
      const savedStudent = await db.student.findById(req.params._id)
      console.log(code)
      if ( savedStudent.code == code ) {
        //student['darsId'] = req.body.darsId 
        //await student.save()
        db.student.updateOne(savedStudent, req.body )
        res.sendStatus(200)
      } else {
        res.sendStatus(404)
      }
    } catch (e) {
       console.log(e)
      res.sendStatus(500);
    }
  })

  app.get('/students', async (req, res) => {
    const students = await db.student.find({})   
    if ( students ) {
      console.log("Got All Students")
      res.json(students)
    } else {
      res.sendStatus(404);
    }
  })

  // update updated students
  // this can actually use the standar rest put/post 2/17/21
  app.post('/students-update', async (req, res) => {
    try {
      const updatedStudents = req.body.students 
      for ( let student of updatedStudents ) {
        //console.log(updatedStudents)
        //let savedStudent = await db.student.findById(student._id)   
        //savedStudent = student
        //console.log(savedStudent)
        //await db.student.deleteMany({})   //
        //await db.student.create(updatedStudents)
        //await savedStudent.save()
        await db.student.findByIdAndUpdate(student._id, student, {upsert: true})
      }
      res.json({success:true})
    } catch (e) {
       console.log(e)
      res.sendStatus(500);
    }
  })


  
 //app.put('/students/:code', async (req, res) => {

 //  const email = req.query.email
 //  const code = req.params.code
 //  const student = await db.student.findOne({code,email})   
 //  if ( student ) {
 //    student['darsId'] = req.body.darsId 
 //    //console.log(JSON.stringify(students,null,2))
 //    //await fs.writeFile(configFile,JSON.stringify(students,null,2))
 //    await student.save()
 //    res.json({success:true})

 //  } else {
 //    res.sendStatus(404);
 //  }

 //});

  app.get('/darses/:darsId', authToken, async (req, res) => {
    try {
      const darsId = req.params.darsId
      const dars = await db.dars.findOne({darsId})   
      if ( dars ) {
        res.json(dars)
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
       console.log(err)
      res.sendStatus(500)
    }
  })

  app.get('/darses', authToken, async (req, res) => {
    try {
      const code = req.code
      const page = req.query.page
      const students = await db.student.find({code})   
      console.log(code)
      console.log(page)
      const student = students[0]   
      const totDarses = await db.dars.count({})   
      const numDarses = student.name === 'test' ? totDarses + 1 : student.darsId + 1   
      console.log('+++++++++++' + totDarses + student + code )
      //const dars = await db.dars.findOne({darsId: student.darsId})   
      const darses = await db.dars.find({darsId: { $in:  Array.from(Array(numDarses).keys())  }},{},{ skip: (page-1)*10, limit: 10})   
      if ( darses ) {
        res.json(darses)
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
  })
  
  app.get('/horoof', async (req, res) => {
    const horoof = await db.harf.find({})   
    if ( horoof ) {
      console.log("FOUND" )
      res.json(horoof)
    } else {
      res.sendStatus(404);
    }
  })


}



