const ErrorResponse = require("../helper/errorResponse");
const Book = require("../models/Book");

exports.getBooks = async (req, res, next) => {
  try {
    const bookList = await Book.find();

    res.status(200).json(bookList);
  } catch (error) {
    next(new ErrorResponse("Error al obtener los libros", 400));
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return next(
        new ErrorResponse("El libro no existe en la bd con este id: " + id, 404)
      );
    }

    res.status(200).json(book);
  } catch (error) {
    next(new ErrorResponse("El libro no existe con este id: " + id, 404));
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const { body } = req;

    const bookData = await Book.create(body);

    res.status(200).json({
      data: bookData,
      message: "Libro creado",
    });
  } catch (error) {
    next(new ErrorResponse("Error: al crear el libro", 400));
  }
};

exports.updateBook = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const book = await Book.findByIdAndUpdate(id, body);

    if (!book) {
      return next(
        new ErrorResponse("El libro no existe con este id: " + id, 400)
      );
    }

    res.status(200).json({ data: book, msg: "Libro ya actualizado" });
  } catch (error) {
    next(new ErrorResponse("El autor no existe con este id: " + id, 400));
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return next(
        new ErrorResponse("El libro no existe con este id: " + id, 400)
      );
    }

    res.status(200).json({ msg: "Libro eliminado" });
  } catch (error) {
    next(new ErrorResponse("El libro no existe con este id: " + id, 400));
  }
};
