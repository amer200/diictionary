const express = require("express");
const route = express.Router();
const mainConroller = require("../controllers/main.js");

route.get("/", mainConroller.getIndex);
route.post("/add-file", mainConroller.addFile);
module.exports = route;
