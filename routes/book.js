const express = require("express");
const api = express.Router();

const {
  getBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/book");

api.route("/").get(getBooks).post(createBook);

api.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);

module.exports = api;
