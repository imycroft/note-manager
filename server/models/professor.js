const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProfessorSchema = new Schema({
  _id: ObjectId,
  firstname: String,
  lastname: String,
  password: String,
  modules: [String],
});

module.exports = Professor = mongoose.model('professors', ProfessorSchema);