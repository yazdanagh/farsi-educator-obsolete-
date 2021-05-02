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


 router.get('/horoof', async (req, res) => {
   const horoof = await db.harf.find({})   
   if ( horoof ) {
     console.log("FOUND" )
     res.json(horoof)
   } else {
     res.sendStatus(404);
   }
 })


module.exports = router

