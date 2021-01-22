

const util = require("util")
const bluebird = require("bluebird")
const exec = util.promisify(require('child_process').exec);
const fs = bluebird.promisifyAll(require("fs-extra"))
const _= require("lodash")
const db = require("./mongo.js")
const cons = require('./constants');

const main = async () => {

   //let idx = -1
   //const darses = cons.darsesInput.map(a => { 
   //  idx++
   //  return { 
   //    horoof: a[0], 
   //    kalameh: a[1],
   //    darsId: idx
   //  }
   //})
   //await db.dars.deleteMany()
   //await db.dars.create(darses)
    const darses = await db.dars.find({}) 
    const harfs = await db.harf.find({}) 

    let harfHash = {}
    let numHarfLearned = 0
    for ( let dars of _.sortBy(darses, "darsId") ) {
      dars.numHarfLearned = numHarfLearned 
      await dars.save()
    
     const darsUniqueHarfForms = _.uniq(dars['kalamehHarfForms'])
     console.log(darsUniqueHarfForms.length)
     let darsHarfs = darsUniqueHarfForms.reduce((tot,harfForm) => { 
       let harf = harfs.find( g => g.harfForms.includes(harfForm))
       if ( harfHash[harf.harfName] ) return tot 
       tot.push(harf)
       harfHash[harf.harfName] = 1
       numHarfLearned++ // dars.numHarfLearned + 1
       return tot
     }, [])
      console.log(dars)
    }
       
    process.exit()
  }
main()
