const Router = require("express");
const express = require("express");
const api = express.Router();

const { createAuthor } = require("../controllers/author.js");

api.route("/").post(createAuthor);

module.exports = api;
