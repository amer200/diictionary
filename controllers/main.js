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
exports.removeFile = (req, res, next) => {
  const id = req.params.id;
  File.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.send(503).send(err);
    });
};
exports.addSubFile = (req, res, next) => {
  const mainId = req.params.id;
  const file = req.body.file;
  File.findById(mainId)
    .then((f) => {
      f.subFile.push(file);
      return f.save();
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(503).send(err.message);
    });
};
