

const db = require("./mongo.js")

const main = async () => {

const all_students = await db.student.find({})

console.log(all_students)

}
main();


