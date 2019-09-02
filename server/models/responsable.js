const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ResponsableSchema = new Schema({
  matricule: String,
  firstname: String,
  lastname: String,
  password: String,
  created: String
});

module.exports = Responsable = mongoose.model('responsables', ResponsableSchema);