const mongoose = require("mongoose");
const fileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subFile: [
    {
      name: String,
    },
  ],
});
module.exports = mongoose.model("File", fileSchema);
