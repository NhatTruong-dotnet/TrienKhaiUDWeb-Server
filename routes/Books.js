const router = require("express").Router();
const Book = require("../models/Book");

router.get("/:name", async (req, res) => {
  try {
      const books = await Book.find({
        name: req.params.name
      });
      res.status(200).json(books); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
      const books = await Book.find({});
      
      res.status(200).json(books); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});


router.get("/delete/:_id", async (req, res) => {
  try {
      const books = await Book.deleteOne({_id: req.params._id });
      console.log("Deleted");
      res.status(200).json(books); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});

router.get("/insert/", async (req, res) => {
  try {
      const books = await Book.insertOne({
        name: req.body.name ,
      });
      console.log("Inserted");
      res.status(200).json(books); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});


router.get("/review/:id", async (req, res) => {
  try {
      const books = await Book.findById(req.params.name);
      res.status(200).json(books.rating); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
