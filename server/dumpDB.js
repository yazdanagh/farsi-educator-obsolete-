

const db = require("./mongo.js")

const main = async () => {

const all_students = await db.student.find({})
for ( let stu of all_students ) { console.log(stu) }
const all_darses = await db.dars.find({})
for ( let dars of all_darses ) { console.log(dars) }
process.exit()

}
main();


