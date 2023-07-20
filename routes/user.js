const express = require("express");
const api = express.Router();
const { security } = require("../middleware/security");

const { login, getUser, registerUser } = require("../controllers/user");

api.get("/", security, getUser);
api.post("/register", registerUser);
api.post("/login", login);

module.exports = api;
