const ErrorResponse = require("../helper/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET_WORD = process.env.JWT_SECRET_WORD;

exports.security = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("El cliente no envió el token", 400));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_WORD);
    console.log(token, decoded);

    const userBd = await User.findOne({ userName: decoded.userName });

    req.user = userBd;

    next();
  } catch (error) {
    return next(
      new ErrorResponse("Error en el procesamiento del token " + error, 400)
    );
  }
};
