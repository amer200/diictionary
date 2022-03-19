const File = require("../models/file");
exports.getIndex = async (req, res, next) => {
  const files = await File.find();
  res.send({
    files: files,
    boxes: [],
  });
};
exports.addFile = (req, res, next) => {
  const name = req.body.name;
  const file = new File({
    name: name,
  });
  file
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.send(503).send(err);
    });
};
