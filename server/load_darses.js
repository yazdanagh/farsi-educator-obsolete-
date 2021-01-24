

const util = require("util")
const bluebird = require("bluebird")
const exec = util.promisify(require('child_process').exec);
const fs = bluebird.promisifyAll(require("fs-extra"))
const _= require("lodash")
const db = require("./mongo.js")
const cons = require('./constants');

const main = async () => {

    const harfFormMap = {}

    const harfs = cons.harfInput.map( a => { 
      const elems = a.split(/\ +/).filter( a=> a)
      const harfName = elems.shift()
      const harfSound = elems.shift()

      let harfLead = null
      const harfForms = []

      while ( elems.length ) { 
        const key = elems.shift()
        const harfForm = elems.shift()
        if ( !harfLead ) {
          harfLead = harfForm
        }
        harfForms.push(harfForm)
        harfFormMap[key] = harfForm
      }
      return { 
        harfName,
        harfSound,
        harfLead,
        harfForms,
      }
    })
    await db.harf.deleteMany()
    await db.harf.create(harfs)
    const harfsDB = await db.harf.find({})
    console.log(harfsDB)



    let idx = 0 
    const darses = cons.darsesInput.map(a => { 
      idx++
      const kalamehHarfForms = a.shift().split(/\ +/).filter( a=> a).map(a => {
        if ( harfFormMap[a] ) { 
           return harfFormMap[a]
        } else {
           return a
        }
      })
      const kalameh = a.shift() 
      return { 
        kalamehHarfForms, 
        kalameh,
        darsId: idx,
        numHarfLearned: 0
      }
    })
    await db.dars.deleteMany()
    await db.dars.create(darses)
    const darsesDB = await db.dars.find({}) 
    console.log(darsesDB)
   
    process.exit()
  }
main()
