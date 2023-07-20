const express = require("express");
const api = express.Router();
const { security } = require("../middleware/security");
const {
  getBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  pagination,
} = require("../controllers/book");

api.route("/").get(security, getBooks).post(security, createBook);

api
  .route("/:id")
  .get(security, getBookById)
  .put(security, updateBook)
  .delete(security, deleteBook);

api.route("/pagination").post(security, pagination);

module.exports = api;
