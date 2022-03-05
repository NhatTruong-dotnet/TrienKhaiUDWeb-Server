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

router.get("/review/:name", async (req, res) => {
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

module.exports = router;
