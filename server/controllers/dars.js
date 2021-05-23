
const express  = require('express');
const router   = express.Router()
const util = require("util")
require("dotenv").config()
const bluebird = require("bluebird")
const exec = util.promisify(require('child_process').exec);
const fs = bluebird.promisifyAll(require("fs-extra"))
const _= require("lodash")
//const dJSON = require('dirty-json');
const db = require("../mongo.js")



  router.get('/darses/:darsId',  async (req, res) => {
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

  router.get('/darses', async (req, res) => {
    try {
      const studentId = req.currentStudentId
      const page = req.query.page
      const students = await db.student.find({studentId})   
      console.log(studentId)
      console.log(page)
      const student = students[0]   
      const totDarses = await db.dars.count({})   
      const numDarses = student.name === 'test' ? totDarses + 1 : student.darsId + 1   
      console.log('+++++++++++' + totDarses + student + studentId )
      //const dars = await db.dars.findOne({darsId: student.darsId})   
      const darses = await db.dars.find({darsId: { $in:  Array.from(Array(numDarses).keys())  }},{},{ sort: {darsId: 1}, skip: (page-1)*5, limit: 5})   
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

module.exports = router
