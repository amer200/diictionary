const express = require("express");
const route = express.Router();
const mainConroller = require("../controllers/main.js");

route.get("/", mainConroller.getIndex);
route.post("/add-file", mainConroller.addFile);
route.delete("/remove-file/:id", mainConroller.removeFile);
route.post("/add-sub-file/:id", mainConroller.addSubFile);
module.exports = route;
