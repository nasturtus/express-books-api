var express = require("express");
var router = express.Router();
var Book = require("../models/books-model");
var mongoose = require("mongoose");

/* GET books listing. */
router.get("/", function(req, res, next) {
  Book.find(function(err, books) {
    if (err) return next(err);
    res.send(books);
  });
});

/* GET specific title. */
router.get("/:title", function(req, res) {
  let title = req.params.title;
  Book.find({ title: title }, function(err, results) {
    if (results.length === 0) {
      res.send("Book not found.");
    } else {
      res.json({ message: results });
    }
  });
});

/* POST a title */
router.post("/", function(req, res, next) {
  let title = req.body.title;
  let author = req.body.author;
  let book = new Book({ title: title, author: author });

  book.save(function(err, book) {
    if (err) return next(err);
  });

  res.json({ message: `${book.title} successfully saved to database.` });
});

/* UPDATE a title */
router.put("/:title", function(req, res, next) {
  let oldTitle = req.params.title;
  let newTitle = req.body.title;

  Book.findOneAndUpdate(
    { title: oldTitle },
    { title: newTitle },
    { new: true },
    function(err, updatedDocument) {
      if (err) {
        next(err);
      } else {
        res.send(updatedDocument);
      }
    }
  );
});

/* DELETE all titles */
router.delete("/", function(req, res) {
  Book.remove(function(err) {
    if (err) return handleError(err);
  });
  res.json({ message: `All books deleted from database.` });
});

/* DELETE title specified */
router.delete("/:title", function(req, res, next) {
  let title = req.params.title;
  Book.deleteOne({ title: title }, function(err) {
    next(err);
  });
  res.json({ message: `delete book with id ${req.params.title}` });
});

module.exports = router;
