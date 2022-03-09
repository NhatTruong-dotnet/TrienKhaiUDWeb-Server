const router = require("express").Router();
const Book = require("../models/Book");


router.get("/:_id", async (req, res) => {
  try {
      const books = await Book.deleteOne({_id: req.params._id });
      console.log("Deleted");
      res.status(200).json(books); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
