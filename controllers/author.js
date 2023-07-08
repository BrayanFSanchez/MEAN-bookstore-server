const Author = require("../models/Author");

exports.createAuthor = async (req, res, next) => {
  try {
    const { body } = req;

    const authorData = await Author.create(body);

    res.status(200).json({
      status: 200,
      data: authorData,
    });
  } catch (error) {
    res.status(400).json({ status: 400, msg: error });
  }
};
