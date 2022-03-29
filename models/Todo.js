const mongoose = require("mongoose");

const Todo = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      maxlength: 60,
    },
    completionDatetime: {
      type: String,
      required: true,
    },
    iscompleted:{
      type:Boolean
    }
  },
  // { timestamps: true }
);

module.exports = mongoose.model("Todo", Todo);