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


const middleware  = require('./middleware');

module.exports = (app) => {

   app.use((req, res, next) => {                                                                                                      
    res.set('access-control-allow-origin', req.headers.origin || '*')                                                                
    res.set('access-control-allow-credentials', true)                                                                                
    next()                                                                                                                           
  })                                                                                                                                 
  app.options('*', (req, res, next) => {                                                                                             
    res.header('access-control-allow-methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')                                             
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization')                                                                                                                         
    res.status(200).send()                                                                                                           
  })                                       

  app.post('/login', async (req, res) => {
     // Auth
     console.log("Logging in ...")
     try {
       const code = req.body.code
       const email = req.body.email
       const student = await db.student.findOne({code,email}) 
       let studentId = student.studentId
       const accessToken = jwt.sign(studentId, process.env.ACCESS_TOKEN_SECRET )
       console.log(`Login successful for student: ${student.name}`)
       res.json({accessToken})
     } catch (e) {
       console.log(e)
       res.sendStatus(403)
     }
  })

  app.use('/', [ middleware.assignCurrentUser ] , require('./student.js') ); 
  app.use('/', [ middleware.assignCurrentUser ] , require('./harf.js') ); 
  app.use('/', [ middleware.assignCurrentUser ] , require('./dars.js') ); 


  // Save all students
  app.post('/students-update', async (req, res) => {
    try {
      const updatedStudents = req.body.students
      //console.log(updatedStudents)
      const students = await db.student.find({})
      await db.student.deleteMany({})   //
      await db.student.create(updatedStudents)
    } catch (e) {
      res.sendStatus(500)
    }
  })

}



