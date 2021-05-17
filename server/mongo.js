

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema({
	name: String,
	naam: String,
	darsId: Number,
  studentId: Number,
	email: String,
	code: Number,
  //studentPic; String
  kelases: [{
     type: Schema.Types.ObjectId,
     ref: 'kelas'
  }],
  profileImage: { data: String, contentType: String }
});
const darsSchema = new Schema({
	kalameh: String,
  kalamehHarfForms: [String], 
  darsId: Number,
  numHarfLearned: Number,
  kalamehAudio: { data: String, contentType: String }

});

const kelasSchema = new Schema({
	kelasName: String,
  kelasImage: { data: String, contentType: String },
});

const harfSchema = new Schema({
	harfName: String,
	harfSound: String,
  harfForms: [String],
  harfImages: [ { data: String, contentType: String }] ,
  harfLead: String,
  harfAudio: { data: String, contentType: String }
});

const Student = mongoose.model("student", studentSchema);
const Dars = mongoose.model("dars", darsSchema);
const Harf = mongoose.model("harf", harfSchema);
const Kelas = mongoose.model("kelas", kelasSchema);

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
