

const util = require("util")
const bluebird = require("bluebird")
const exec = util.promisify(require('child_process').exec);
const fs = bluebird.promisifyAll(require("fs-extra"))
const _= require("lodash")
const db = require("./mongo.js")
const cons = require('./constants');

const main = async () => {

    let idx = -1
    const darses = cons.darsesInput.map(a => { 
      idx++
      return { 
        horoof: a[0], 
        kalameh: a[1],
        darsId: idx
      }
    })
    await db.dars.deleteMany()
    await db.dars.create(darses)
    const darsesDB = await db.dars.find({}) 
    console.log(darsesDB)

    
    const harves = cons.harfInput.map( a => { 
      const elems = a.split(' ')
      return { 
        harfName: elems[0],
        harf: elems[1],
        harfGroup: elems.slice(1).join(' ')
      }
    })
    await db.harf.deleteMany()
    await db.harf.create(harves)
    const harvesDB = await db.harf.find({})
    console.log(harvesDB)
       
    process.exit()
  }
main()
