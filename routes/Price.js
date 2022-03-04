const router = require("express").Router();
const Book = require("../models/Book");

router.get("/:price", async (req, res) => {
  try {
      const books = await Book.find({
        price: req.params.price
      });
      res.status(200).json(books); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
