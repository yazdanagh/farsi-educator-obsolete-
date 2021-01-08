'use strict'                                                                                                                                                   

//const defines = require("../../common/defines.js");

const util = require("util")
const bluebird = require("bluebird")
const exec = util.promisify(require('child_process').exec);
//const moment = require("moment")
//const cronParser = require("cron-parser");
//const cronstrue = require('cronstrue');
//const reshape = require('mathjs').reshape
const fs = bluebird.promisifyAll(require("fs-extra"))
const _= require("lodash")
//const dJSON = require('dirty-json');


const configFile = './students_new.config'

const middleware  = require('./middleware');


const doAuth = (code,email,students) => {
  const student = students.find( st => { 
    return st.email === email && st.code == code 
  })
  return student 
}

//const cronMachines = defines.cronMachines 

module.exports = (app) => {


  //app.use('/api', [middleware.assignCurrentUser, middleware.requireCurrentUser], require('./api'));
  //app.use( '/jobs', [middleware.assignCurrentUser ]); //, middleware.requireCurrentUser]);


  app.get('/students/:code', async (req, res) => {
    const email = req.query.email
    const code = req.params.code
    const stConf = await fs.readFile(configFile,"utf-8")
    const students = JSON.parse(stConf)
    console.log(code)
    console.log(students)
    console.log(req.params)
    const student = doAuth(code,email,students.students)
    //    console.log(student)
    if ( student ) {
      console.log("FOUND")
      res.json(student)
    } else {
      res.sendStatus(404);
    }
  })

  app.get('/students', async (req, res) => {
    const admin_code = req.query.admin_code
    const stConf = await fs.readFile(configFile,"utf-8")
    const students = JSON.parse(stConf)
    if ( admin_code == 6100 ) {
      console.log("FOUND")
      res.json(students)
    } else {
      res.sendStatus(404);
    }
  })
  app.post('/students-update', async (req, res) => {
    const admin_code = req.query.admin_code
    if ( true || admin_code === 6100 ) {
    const students = req.body 
    console.log(JSON.stringify(students,null,2))
    await fs.writeFile(configFile,JSON.stringify(students,null,2))
    res.json({success:true})
       
    } else {
      res.sendStatus(404);
    }
  })


  
  app.put('/students/:code', async (req, res) => {

    const email = req.query.email
    const code = req.params.code
    const stConf = await fs.readFile(configFile,"utf-8")
    const students = JSON.parse(stConf)
    //console.log(students)
    const student = doAuth(code,email,students.students)
    console.log(student)
    if ( student ) {
    student['darsId'] = req.body.darsId 
    //console.log(JSON.stringify(students,null,2))
    await fs.writeFile(configFile,JSON.stringify(students,null,2))
    res.json({success:true})

      } else {
         res.sendStatus(404);
      }
    
  });

  app.get('/users', async (req, res) => {
    console.log("HERE")
    const stConf = await fs.readFile('./students.config',"utf-8")
    const students = JSON.parse(stConf)

    //let students = stConf.split('\n').slice(0,-1)
    //students = students.reduce((tot,a) => { 
      //    const b = a.split(':'); 
      //    tot[b[0]] = b[1] 
      //    return tot;
  //   } , {})
  console.log(students)

  //let students = {
    //   "Yara" : 4,
    //   "Delsa": 2
    //}
    res.json( students )
  });

  app.put('/users', async (req, res) => {
    console.log("HERE PUT")
    console.log(req.body)
    const stConf = await fs.readFile('./students.config',"utf-8")
    const students = JSON.parse(stConf)
    const progress = req.body 
    students[progress['student']] = progress['dars']
    console.log(JSON.stringify(students,null,2))
    await fs.writeFile('./students.config',JSON.stringify(students,null,2))
    res.json({success:true})

  });


}



