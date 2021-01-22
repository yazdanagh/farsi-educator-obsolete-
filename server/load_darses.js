

const util = require("util")
const bluebird = require("bluebird")
const exec = util.promisify(require('child_process').exec);
const fs = bluebird.promisifyAll(require("fs-extra"))
const _= require("lodash")
const db = require("./mongo.js")
const cons = require('./constants');

const main = async () => {

    let idx = 0 
    const darses = cons.darsesInput.map(a => { 
      idx++
      return { 
        kalamehHarfForms: a[0].split(' '), 
        kalameh: a[1],
        darsId: idx,
        numHarfLearned: 0
      }
    })
    await db.dars.deleteMany()
    await db.dars.create(darses)
    const darsesDB = await db.dars.find({}) 
    console.log(darsesDB)

    
    const harfs = cons.harfInput.map( a => { 
      const elems = a.split(' ')
      return { 
        harfName: elems[0],
        harfSound: elems[1],
        harfLead: elems[2],
        harfForms: elems.slice(2)
      }
    })
    await db.harf.deleteMany()
    await db.harf.create(harfs)
    const harfsDB = await db.harf.find({})
    console.log(harfsDB)
       
    process.exit()
  }
main()
