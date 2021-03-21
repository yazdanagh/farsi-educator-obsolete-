

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
      const harfAudio = { data: null, contentType : "audio/mp3" } 
      const audioFile = `../client/src/audios/${harfSound}.mp3`
      console.log(`harfSound ${harfSound} added`)
      let fileData =  await fs.readFile(audioFile)
      harfAudio.data = fileData.toString('base64');
      const harfImages= []
      for ( let harfForm of harfForms ) {
        const imageFile = `../client/src/images2/${harfForm}.png`
        let fileData =  await fs.readFile(imageFile)
        const harfImage = { data: null, contentType : "image/png" } 
        harfImage.data = fileData.toString('base64');
        harfImages.push(harfImage)
      }
      harfs.push({ 
        harfName,
        harfSound,
        harfLead,
        harfForms,
        harfImages,
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
        const kalamehAudio = { data: null, contentType : "audio/mp3" } 
        const audioFile = `../client/src/audios/${kalameh}.mp3`
        //const kalamehAudio = { data: null, contentType : "audio/m4a" } 
        //const audioFile = `../client/src/audios/${kalameh}.m4a`
        const fileExists = await fs.exists(audioFile)
        if ( fileExists ) {
          let fileData =  await fs.readFile(audioFile)
          kalamehAudio.data = fileData.toString('base64');
          console.log(`kalameh ${kalameh} was added`)
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
    //console.log(darsesDB)

    const profiles = []
    const students = await db.student.find({})
    for ( let [id,student] of students.entries() ) {
      try {
        const imageFile = `../client/src/images2/profiles/${student.name}.jpg`
        let fileData =  await fs.readFile(imageFile)
        console.log(imageFile)
        const profileImage = { data: null, contentType : "image/jpg" } 
        profileImage.data = fileData.toString('base64');
        student.profileImage = profileImage
        await student.save()
      } catch (e) {
        console.log(e)
      }
    }

  } catch (e) {
    console.log(e)
  }
  process.exit()
}
main()
