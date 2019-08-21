const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const StudentSchema = new Schema({
 
  matricule: String,
  firstname: String,
  lastname: String,
  password: String,
  
  notes: [
    {
      module: String,
      note: Number
    }
  ],
  reclamation: [
    {
      module: String,
      PV: String,
      Value: String
    }
  ],
  created: String
});

module.exports = Student = mongoose.model('students', StudentSchema);