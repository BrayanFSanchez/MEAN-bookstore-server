const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const connectDatabase = require("./config/db");

dotenv.config({ path: "./config/config.env" });
connectDatabase();

const book = require("./routes/book");
const author = require("./routes/author");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/Book", book);
app.use("/api/BookstoreAuthor", author);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log("Servidor se ejecuta en ambiente", process.env.NODE_ENV)
);

process.on("unhandledRejection", (err, promise) => {
  console.log("Errors", err.message);
  server.close(() => process.exit(1));
});
