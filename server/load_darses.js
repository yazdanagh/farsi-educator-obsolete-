

const util = require("util")
const bluebird = require("bluebird")
const exec = util.promisify(require('child_process').exec);
const fs = bluebird.promisifyAll(require("fs-extra"))
const _= require("lodash")
const db = require("./mongo.js")
const cons = require('./constants');

const main = async () => {
  try {
    const harfFormMap = {}
    const harfs = [] 
    for ( let a of cons.harfInput ) {
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
      const harfAudio = { data: null, contentType : "audio/m4a" } 
      const audioFile = `../client/public/audios/${harfSound}.m4a`
      console.log(audioFile)
      let fileData =  await fs.readFile(audioFile)
      harfAudio.data = fileData.toString('base64');
      harfs.push({ 
        harfName,
        harfSound,
        harfLead,
        harfForms,
        harfAudio,
      })
    }
    await db.harf.deleteMany()
    await db.harf.create(harfs)
    const harfsDB = await db.harf.find({})
    //console.log(harfsDB)

    const darses = []
    for ( let [idx,a] of cons.darsesInput.entries() ) { 
        const kalamehHarfForms = a.shift().split(/\ +/).filter( a=> a).map(a => {
          if ( harfFormMap[a] ) { 
            return harfFormMap[a]
          } else {
            return a
          }
        })
        const kalameh = a.shift() 
        const kalamehAudio = { data: null, contentType : "audio/m4a" } 
        const audioFile = `../client/public/audios/${kalameh}.m4a`
        const fileExists = await fs.exists(audioFile)
        if ( fileExists ) {
          let fileData =  await fs.readFile(audioFile)
          kalamehAudio.data = fileData.toString('base64');
          console.log(kalamehAudio.data)
        }
        darses.push({ 
          kalamehHarfForms, 
          kalameh,
          darsId: idx + 1,
          kalamehAudio,
          numHarfLearned: 0,
        })
    }
    await db.dars.deleteMany()
    await db.dars.create(darses)
    const darsesDB = await db.dars.find({}) 
    console.log(darsesDB)

  } catch (e) {
    console.log(e)
  }
  process.exit()
}
main()
