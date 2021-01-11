

const util = require("util")
const bluebird = require("bluebird")
const exec = util.promisify(require('child_process').exec);
const fs = bluebird.promisifyAll(require("fs-extra"))
const _= require("lodash")
const db = require("./mongo.js")

  const harfInput = [
   "alef aa_bakola aa_chasban aa_bakola aa_bikola"  ,
   "be be_bozorg_tanha be_koochik_chap  be_koochik_dovar be_bozorg_chasban be_bozorg_tanha" ,
   "de de_tanha de_chasban" ,
   "me me_bozorg_tanha me_koochik_chap me_koochik_dovar  me_bozorg_chasban" ,
   "re re_tanha re_chasban" ,
   "ye ye_bozorg_tanha ye_koochik_chap ye_koochik_dovar ye_bozorg_chasban" ,
   "ne ne_bozorg_tanha ne_koochik_rast ne_koochik_dovar ne_bozorg_chasban" ,
   "sin sine_chasban_chap sine_chasban_dovar sine_bozorg_chasban sine_bozorg_tanha" ,
  //[ faseleh ] 
]


  const main = async () => {

    let idx = -1
    const darses = darsesInput.map(a => { 
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

    
    const harves = harfInput.map( a => { 
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
