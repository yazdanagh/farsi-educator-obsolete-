

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
  kalamehHarfKeys: [String], 
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
	harfSounds: [String],
  harfForms: [String],
  harfKeys: [String],
  harfGroups: [ String ], 
  harfImages: [ { data: String, contentType: String }] ,
  harfLead: String,
  harfAudios: [{ data: String, contentType: String }]
});

const Student = mongoose.model("student", studentSchema);
const Dars = mongoose.model("dars", darsSchema);
const Harf = mongoose.model("harf", harfSchema);
const Kelas = mongoose.model("kelas", kelasSchema);

mongoose.connect("mongodb://yazdan:my_pwd2@localhost:27017/shekkar2", { useNewUrlParser: true });
//const a = await Student.find({}, "name naam")
//console.log(a)
//console.log(Student.find({}, "name naam"))
//console.log(Student.find({} ))
//
//
//console.log(mongoose)
console.log("Database connection stablished successfully")

module.exports = mongoose.models 
