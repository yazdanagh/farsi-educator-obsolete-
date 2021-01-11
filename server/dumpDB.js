

const db = require("./mongo.js")
const util = require("util")

const main = async () => {

const all_students = await db.student.find({})
console.log(util.inspect(all_students, {showHidden: false, depth: null}))
//for ( let stu of all_students ) { console.log(stu) }
const all_darses = await db.dars.find({})
//for ( let dars of all_darses ) { console.log(dars) }
console.log(util.inspect(all_darses, {showHidden: false, depth: null}))
const all_harves = await db.harf.find({})
console.log(util.inspect(all_harves, {showHidden: false, depth: null}))
process.exit()

}
main();


