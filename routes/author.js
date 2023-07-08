const Router = require("express");
const express = require("express");
const api = express.Router();

const {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/author.js");

api.route("/").post(createAuthor).get(getAuthors);
api.route("/:id").get(getAuthorById).put(updateAuthor).delete(deleteAuthor);

module.exports = api;
