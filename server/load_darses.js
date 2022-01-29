const util = require("util")
const bluebird = require("bluebird")
const exec = util.promisify(require('child_process').exec);
const fs = bluebird.promisifyAll(require("fs-extra"))
const _= require("lodash")



const db = require("./mongo.js")
const cons = require('./constants');

const main = async ( verbose ) => {
  try {
    const harfFormMap = {}
    const harfs = [] 
    console.log(" === Loading all harf forms ..." )
    for ( let a of cons.harfInput ) {
      // alef 
      //     aa aaba aa_bakola self
      const elems = a.match(/\b(\w+)\b/g).filter( a=> a).filter(a => a != '\n' )
      // harfName
      const harfName = elems.shift()

      let harfLead = null
      const harfForms = []
      const harfAudios = []
      const harfSounds = []
      const harfGroups = []
      const harfKeys = []

      // After harfname we have groups of four 	
      // we also have a harfLead that is extracted 
      //
      // TODO : optimize such that same harf audio is not repeated
      while ( elems.length ) { 
        const harfSound = elems.shift()
        const key = elems.shift()
        let harfForm = elems.shift()
        let harfGroup = elems.shift() 
        if ( harfForm === "_" ) { 
           harfForm = key
        }
        if (!harfLead) {
          harfLead = harfForm
        }
        harfForms.push(harfForm)
        harfSounds.push(harfSound)
        harfGroups.push(harfGroup)
        harfKeys.push(key)
        harfFormMap[key] = harfForm

        const harfAudio = { data: null, contentType : "audio/mp3" } 
        const audioFile = `../client/src/audios_hrkt/harfs/${harfSound}.mp3`
        const fileExists = await fs.exists(audioFile)
        if ( fileExists ) {
          if ( verbose ) {
          console.log(`harf ${harfName} harfSound ${harfSound} added`)
	  }
          let fileData =  await fs.readFile(audioFile)
          harfAudio.data = fileData.toString('base64');
        } else { 
          console.log(`Error: harf ${harfName} harfSound ${audioFile} could NOT be found!`)
	}

        harfAudios.push(harfAudio)
      }
      
      const harfImages= []
      if ( verbose ) {
      console.log('Extracted harf Forms: ' + harfForms)
      }
      for ( let harfForm of harfForms ) {
        const imageFile = `../client/src/images3/${harfForm}.png`
        const fileExists =  await fs.exists(imageFile)
        if ( fileExists ) { 
            let fileData =  await fs.readFile(imageFile)
            const harfImage = { data: null, contentType : "image/png" } 
            harfImage.data = fileData.toString('base64');
            harfImages.push(harfImage)
        } else {
           console.log(`Error: harf ${harfName} imageFile ${imageFile} could NOT be found!`)
        }
      }
      if ( verbose ) {
          console.log(`harf groups` + harfGroups)
      }
      harfs.push({ 
        harfName,
        harfSounds,
        harfGroups,
        harfKeys,
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
    console.log(` === Loading all harf forms Done. Added ${cons.harfInput.length} harfs.` )

    console.log("\n === Loading all Darses ..." )
    const darses = []
    for ( let [idx,a] of cons.darsesInput.entries() ) { 
        const kalamehHarfKeys = a.shift().match(/\b(\w+)\b/g).filter( a=> a).map(a => {
            return a
        })
        const kalameh = a.shift() 
        const kalamehAudio = { data: null, contentType : "audio/mp3" } 
        const audioFile = `../client/src/audios_hrkt/kalamehs/${kalameh}.mp3`
        //const kalamehAudio = { data: null, contentType : "audio/m4a" } 
        //const audioFile = `../client/src/audios/${kalameh}.m4a`
        const fileExists = await fs.exists(audioFile)
        if ( fileExists ) {
          let fileData =  await fs.readFile(audioFile)
          kalamehAudio.data = fileData.toString('base64');
        } else {
          console.log(`Error: kalameh Audio file ${audioFile} doesnt exist!`)
        }
        if ( verbose ) {
          console.log(`kalameh ${kalameh} was added`)
        }
        darses.push({ 
          kalamehHarfKeys, 
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
    console.log(` === Loading all darses Done. Added ${cons.darsesInput.length} darses` )

    console.log("\n === Adding students ..." )
    const profiles = []
    const students = await db.student.find({})
    const kelases = await db.kelas.find({})

    // Create students in student config
    let configStudents =  await fs.readFile("./students.config")
    configStudents = JSON.parse(configStudents )
    //console.log(configStudents)
    for ( let configStudent of configStudents ) {
      if ( !students.find( s => s.studentId === configStudent.studentId )) {
        await db.student.create(configStudent)
      }
    }

    

    for ( let [id,student] of students.entries() ) {
      try {
        const imageFile = `../client/src/images2/profiles/${student.name}.jpg`
        const fileExists =  await fs.readFile(imageFile)
        if ( fileExists ) {
            let fileData =  await fs.readFile(imageFile)
            const profileImage = { data: null, contentType : "image/jpg" } 
            profileImage.data = fileData.toString('base64');
            student.profileImage = profileImage
            await student.save()
        } else {
          console.log(`Error: Student image file ${imageFile} doesnt exist!`)
        }
      } catch (e) {
        console.log(e)
      }
    }
    console.log(` === Adding students Done. Added ${configStudents.length} students.` )

    console.log("\n === Adding classes ..." )
    // Create kelases in kalases config
    let configKelases =  await fs.readFile("./kelases.config")
    configKelases = JSON.parse(configKelases )
    //console.log(configKelases)
    for ( let configKelas of configKelases ) {
      if ( !kelases.find( k => k.kelasName === configKelas.kelasName )) {
        await db.kelas.create(configKelas)
        console.log(`class ${configKelas} was created`)
      }
    }
    console.log(` === Adding classes Done. Added ${configKelases.length} students.` )

  } catch (e) {
    console.log(e)
  }
  process.exit()
}
main()
