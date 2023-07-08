const express = require("express");
const api = express.Router();

const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/book");

api.route("/").get(getBooks).post(createBook);

api.route("/:id").get(getBook).put(updateBook).delete(deleteBook);

module.exports = api;
