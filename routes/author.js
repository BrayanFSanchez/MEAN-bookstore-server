const express = require("express");
const api = express.Router();
const { security } = require("../middleware/security");

const {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/author");

api.route("/").post(security, createAuthor).get(security, getAuthors);
api
  .route("/:id")
  .get(security, getAuthorById)
  .put(security, updateAuthor)
  .delete(security, deleteAuthor);

module.exports = api;
