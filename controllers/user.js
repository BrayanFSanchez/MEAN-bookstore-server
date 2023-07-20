const User = require("../models/User");
const ErrorResponse = require("../helper/errorResponse");

exports.registerUser = async (req, res, next) => {
  try {
    const { name, lastName, userName, email, password } = req.body;

    const userBd = await User.create({
      name,
      lastName,
      userName,
      email,
      password,
    });

    const token = userBd.createJsonWebToken();

    res.status(200).json({
      status: 200,
      id: userBd._id,
      name,
      lastName,
      userName,
      email,
      token,
    });
  } catch (error) {
    next(new ErrorResponse("Error registrando usuario" + error, 400));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse("Ingrese un email y password", 400));
    }

    const userBd = await User.findOne({ email }).select("+password");

    if (!userBd) {
      return next(
        new ErrorResponse("El usuario no existe en la base de datos", 400)
      );
    }

    const valueBool = await userBd.validatePassword(password);

    if (!valueBool) {
      return next(new ErrorResponse("Las credenciales son incorrectas", 400));
    }

    const token = userBd.createJsonWebToken();

    res.status(200).json({
      status: 200,
      id: userBd._id,
      name: userBd.name,
      lastName: userBd.lastName,
      userName: userBd.userName,
      email: userBd.email,
      token,
    });
  } catch (error) {
    next(new ErrorResponse("Error en el login" + error, 400));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const userToken = req.user;
    const token = await userToken.createJsonWebToken();

    res.status(200).json({
      status: 200,
      id: userToken._id,
      name: userToken.name,
      lastName: userToken.lastName,
      userName: userToken.userName,
      email: userToken.email,
      token,
    });
  } catch (error) {
    next(
      new ErrorResponse("Error obteniendo la sesión del usuario" + error, 400)
    );
  }
};
