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

exports.pagination = async (req, res, next) => {
  try {
    const { sort, sortDirection, filterValue, page, pageSize } = req.body;

    const parsedPage = parseInt(page);
    const parsedPageSize = parseInt(pageSize);

    console.log("page: " + page);
    console.log("pageSize: " + pageSize);

    let filter = "";
    let filterProperty = "";
    let books = [];

    let totalRows = 0;

    if (filterValue) {
      filter = filterValue.value;
      filterProperty = filterValue.property;

      books = await Book.find({
        [filterProperty]: new RegExp(filter, "i"),
      })
        .sort({ [sort]: sortDirection })
        .skip((parsedPage - 1) * parsedPageSize)
        .limit(parsedPageSize);

      console.log("data: " + books);

      totalRows = await Book.find({
        [filterProperty]: new RegExp(filter, "i"),
      }).count();
    } else {
      books = await Book.find()
        .sort({ [sort]: sortDirection })
        .skip((parsedPage - 1) * parsedPageSize)
        .limit(parsedPageSize);

      totalRows = await Book.find().count();
    }

    const pagesQuantity = Math.ceil(totalRows / parsedPageSize);

    res.status(200).json({
      status: 200,
      parsedPageSize,
      parsedPage,
      sort,
      sortDirection,
      pagesQuantity,
      totalRows,
      data: books,
    });
  } catch (error) {
    next(new ErrorResponse("Error a la hora de la páginación ", 400));
  }
};
