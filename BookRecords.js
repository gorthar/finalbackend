const mongoose = require("mongoose");

const BookRecordsSchema = new mongoose.Schema({
    title: {type: String ,required: true},
    author:{type: String,required: true},
    description: {type: String},
  });

  const BookRecords = mongoose.model("BookRecords", BookRecordsSchema);
module.exports = BookRecords;