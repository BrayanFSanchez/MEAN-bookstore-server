const { mongoose } = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  academicLevel: String,
  fullName: String,
});

module.exports = mongoose.model("Author", AuthorSchema);
