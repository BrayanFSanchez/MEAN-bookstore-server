const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const BookSchema = new moongoose.Schema({
  title: {
    required: [true, "Ingrese un titulo de libro"],
    maxlength: [
      500,
      "El titulo del libro no puede ser mayor de 500 caracteres",
    ],
    type: String,
  },
  description: String,
  price: Number,
  publicationDate: Date,
  author: { id: String, fullName: String },
});

module.exports = mongoose.model("Book", BookSchema);
