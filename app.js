require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;


app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const mainRoute = require("./routes/main");
const { default: mongoose } = require("mongoose");
app.use("/", mainRoute);

mongoose
  .connect(DB_URL)
  .then((result) => {
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`app listinng on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
