const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET_WORD = process.env.JWT_SECRET_WORD;
const JWT_EXPIRE = process.env.JWT_EXPIRE;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor ingrese un nombre"],
  },
  lastName: {
    type: String,
    required: [true, "Por favor ingrese un apellido"],
  },
  userName: {
    type: String,
    required: [true, "Por favor ingrese un username"],
  },
  email: {
    type: String,
    required: [true, "Por favor ingrese un email"],
    unique: true,
    match: [
      /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
      "Ingrese un email válido",
    ],
  },
  password: {
    type: String,
    required: [true, "Por favor ingrese un password"],
    minlength: 6,
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJsonWebToken = function () {
  return jwt.sign({ userName: this.userName }, JWT_SECRET_WORD, {
    expiresIn: JWT_EXPIRE,
  });
};

UserSchema.methods.validatePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
