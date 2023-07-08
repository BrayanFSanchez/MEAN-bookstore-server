const Author = require("../models/Author");

exports.createAuthor = async (req, res, next) => {
  try {
    const { body } = req;

    const authorData = await Author.create(body);

    res.status(200).json({
      data: authorData,
      message: "Autor creado",
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Error al crear el autor",
    });
  }
};

exports.getAuthors = async (req, res, next) => {
  try {
    const authorList = await Author.find();

    res.status(200).json(authorList);
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: "Error al traer los autores" });
  }
};

exports.getAuthorById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const author = await Author.findById(id);

    res.status(200).json(author);
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: "Error al obtener a un autor por id" });
  }
};

exports.updateAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const author = await Author.findByIdAndUpdate(id, body);

    if (!author) {
      return res
        .status(400)
        .json({ error: true, message: "Autor no encontrado" });
    }

    res.status(200).json({ data: author, msg: "Autor ya actualizado" });
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: "Error al actualizar al autor" });
  }
};

exports.deleteAuthor = async (req, res, next) => {
  const { id } = req.params;

  try {
    const author = await Author.findByIdAndDelete(id);

    if (!author) {
      return res
        .status(400)
        .json({ error: true, message: "Autor no encontrado" });
    }

    res.status(200).json({ msg: "Autor eliminado" });
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: "Error al eliminar al autor" });
  }
};
