

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema({
	name: String,
	naam: String,
	darsId: Number,
	email: String,
	code: Number
});
const darsSchema = new Schema({
	kalameh: String,
  kalamehHarfForms: [String], 
  darsId: Number 
});
const harfSchema = new Schema({
	harfName: String,
	harfSound: String,
  harfForms: [String],
  harfLead: String,
});
const Student = mongoose.model("student", studentSchema);
const Dars = mongoose.model("dars", darsSchema);
const Harf = mongoose.model("harf", harfSchema);

mongoose.connect("mongodb://yazdan:my_pwd@localhost:27017/shekkar", { useNewUrlParser: true });
//const a = await Student.find({}, "name naam")
//console.log(a)
//console.log(Student.find({}, "name naam"))
//console.log(Student.find({} ))
//
//
//console.log(mongoose)
console.log("Database connection stablished successfully")

module.exports = mongoose.models 
