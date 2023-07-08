exports.getBooks = (req, res, next) => {
  res.status(200).json({ status: 200, msg: "Se proceso correctamente" });
};

exports.getBook = (req, res, next) => {
  res.status(200).json({ status: 200, msg: "Se devuelve el libro por id" });
};

exports.createBook = (req, res, next) => {
  res.status(200).json({ status: 200, msg: "Se ha creado el libro" });
};

exports.updateBook = (req, res, next) => {
  res.status(200).json({ status: 200, msg: "Se actualizó el libro" });
};

exports.deleteBook = (req, res, next) => {
  res.status(200).json({ status: 200, msg: "Se elimino el libro" });
};
