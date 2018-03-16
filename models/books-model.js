var mongoose = require("mongoose");

// book schema
const bookSchema = mongoose.Schema({
  title: String,
  author: String
});

// Book model
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
