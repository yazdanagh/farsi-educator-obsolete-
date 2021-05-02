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
     console.log("Hi")
     try {
       const code = req.body.code
       const email = req.body.email
       const student = await db.student.findOne({code,email}) 
       let studentId = student.studentId
       const accessToken = jwt.sign(studentId, process.env.ACCESS_TOKEN_SECRET )
       res.json({accessToken})
     } catch (e) {
       console.log(e)
       res.sendStatus(403)
     }
  })

  app.use('/', [ middleware.assignCurrentUser ] , require('./student.js') ); 
  app.use('/', [ middleware.assignCurrentUser ] , require('./harf.js') ); 
  app.use('/', [ middleware.assignCurrentUser ] , require('./dars.js') ); 


 // temporarily put this back
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

/////// update updated students
/////// this can actually use the standar rest put/post 2/17/21
///////app.post('/students-update', async (req, res) => {
///////  try {
///////    const updatedStudents = req.body.students 
///////    for ( let student of updatedStudents ) {
///////      //console.log(updatedStudents)
///////      //let savedStudent = await db.student.findById(student._id)   
///////      //savedStudent = student
///////      //console.log(savedStudent)
///////      //await db.student.deleteMany({})   //
///////      //await db.student.create(updatedStudents)
///////      //await savedStudent.save()
///////      if ( student._id ) {
///////        await db.student.findByIdAndUpdate(student._id, student )
///////        console.log(`Update student ${student.name}`)
///////      } else {
///////        await db.student.create(student)
///////        console.log(`Create student ${student.name}`)
///////      }
///////    }
///////    res.json({success:true})
///////  } catch (e) {
///////     console.log(e)
///////    res.sendStatus(500);
///////  }
///////})


  
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
  
// app.get('/horoof', async (req, res) => {
//   const horoof = await db.harf.find({})   
//   if ( horoof ) {
//     console.log("FOUND" )
//     res.json(horoof)
//   } else {
//     res.sendStatus(404);
//   }
// })


}



