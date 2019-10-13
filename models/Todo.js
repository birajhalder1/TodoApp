const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const todoSchema = new Schema({
  name: {
    type: String
  },
  taskName: {
    type: String
  }
});
module.exports = Todo = mongoose.model("todo", todoSchema);
