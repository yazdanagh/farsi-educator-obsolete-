

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
      const elems = a.split(/\ +/).filter( a=> a).filter(a => a != '\n' )
      const harfName = elems.shift()

      let harfLead = null
      const harfForms = []
      const harfAudios = []
      const harfSounds = []

      // TODO : optimize such that same harf audio is not repeated
      while ( elems.length ) { 
        const harfSound = elems.shift()
        const key = elems.shift()
        let harfForm = elems.shift()
        if ( harfForm === "_" ) { 
           harfForm = key
        }
        if ( !harfLead ) {
          harfLead = harfForm
        }
        harfForms.push(harfForm)
        harfSounds.push(harfSound)
        harfFormMap[key] = harfForm

        const harfAudio = { data: null, contentType : "audio/mp3" } 
        const audioFile = `../client/src/audios/${harfSound}.mp3`
        const fileExists = await fs.exists(audioFile)
        if ( fileExists ) {
          console.log(`harf ${harfName} harfSound ${harfSound} added`)
          let fileData =  await fs.readFile(audioFile)
          harfAudio.data = fileData.toString('base64');
        }

        harfAudios.push(harfAudio)
      }
      
      const harfImages= []
      console.log(harfForms)
      for ( let harfForm of harfForms ) {
        const imageFile = `../client/src/images3/${harfForm}.png`
        let fileData =  await fs.readFile(imageFile)
        const harfImage = { data: null, contentType : "image/png" } 
        harfImage.data = fileData.toString('base64');
        harfImages.push(harfImage)
      }
      harfs.push({ 
        harfName,
        harfSounds,
        harfLead,
        harfForms,
        harfImages,
        harfAudios,
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
        }
          console.log(`kalameh ${kalameh} was added`)
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


  // const kelases = await db.kelas.find({})
  // // create kelases in kelas config
  // let configKelases =  await fs.readFile("./kelases.config")
  // configKelases = JSON.parse(configKelases )
  // console.log(configKelases)
  // for ( let configKelas of configKelases ) {
  //   if ( !students.find( s => s.studentId === configKelas.studentId )) {
  //     await db.student.create(configStudent)
  //   }
  // }
    
    const profiles = []
    const students = await db.student.find({})
    const kelases = await db.kelas.find({})

    // Create students in student config
    let configStudents =  await fs.readFile("./students.config")
    configStudents = JSON.parse(configStudents )
    console.log(configStudents)
    for ( let configStudent of configStudents ) {
      if ( !students.find( s => s.studentId === configStudent.studentId )) {
        await db.student.create(configStudent)
      }
    }

    // Create kelases in kalases config
    let configKelases =  await fs.readFile("./kelases.config")
    configKelases = JSON.parse(configKelases )
    console.log(configKelases)
    for ( let configKelas of configKelases ) {
      if ( !kelases.find( k => k.kelasName === configKelas.kelasName )) {
        await db.kelas.create(configKelas)
        console.log(`class ${configKelas} was created`)
      }
    }


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
