const ErrorResponse = require("../helper/errorResponse");
const Author = require("../models/Author");

exports.createAuthor = async (req, res, next) => {
  try {
    const { body } = req;

    const authorData = await Author.create(body);

    res.status(200).json({
      data: authorData,
      message: "Autor creado",
    });
  } catch (error) {
    next(new ErrorResponse("Error: al crear el autor", 404));
  }
};

exports.getAuthors = async (req, res, next) => {
  try {
    const authorList = await Author.find();

    res.status(200).json(authorList);
  } catch (error) {
    next(new ErrorResponse("Error al obtener los autores", 404));
  }
};

exports.getAuthorById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await Author.findById(id);

    if (!author) {
      return next(
        new ErrorResponse("El autor no existe en la bd con este id: " + id, 404)
      );
    }

    res.status(200).json(author);
  } catch (error) {
    next(new ErrorResponse("El autor no existe con este id: " + id, 404));
  }
};

exports.updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const author = await Author.findByIdAndUpdate(id, body);

    if (!author) {
      return next(
        new ErrorResponse("El autor no existe con este id: " + id, 404)
      );
    }

    res.status(200).json({ data: author, msg: "Autor ya actualizado" });
  } catch (error) {
    next(new ErrorResponse("El autor no existe con este id: " + id, 404));
  }
};

exports.deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await Author.findByIdAndDelete(id);

    if (!author) {
      return next(
        new ErrorResponse("El autor no existe con este id: " + id, 404)
      );
    }

    res.status(200).json({ msg: "Autor eliminado" });
  } catch (error) {
    next(new ErrorResponse("El autor no existe con este id: " + id, 404));
  }
};
