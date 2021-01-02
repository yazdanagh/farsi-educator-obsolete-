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



const middleware  = require('./middleware');


//const cronMachines = defines.cronMachines 

module.exports = (app) => {


  //app.use('/api', [middleware.assignCurrentUser, middleware.requireCurrentUser], require('./api'));
  //app.use( '/jobs', [middleware.assignCurrentUser ]); //, middleware.requireCurrentUser]);


  app.get('/users', async (req, res) => {
    console.log("HERE")
    const stConf = await fs.readFile('./students.config',"utf-8")
    console.log(stConf)
    let students = stConf.split('\n').slice(0,-1)
    students = students.reduce((tot,a) => { 
        const b = a.split(':'); 
        tot[b[0]] = b[1] 
        return tot;
       } , {})
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
    res.json( )

  });

}



