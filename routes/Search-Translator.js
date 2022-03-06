const router = require("express").Router();
const Book = require("../models/Book");

router.get("/:translator", async (req, res) => {
  try {
      const books = await Book.find({
        translator: req.params.translator
      });
      res.status(200).json(books); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});
router.post("/", async (req, res) => {
  try {
    if(req.body.translator==""){
      const books = await Book.find({
        translator: req.body.translator
      });

      res.status(200).json(books);  
    }
    
    }
 catch (error) {
    res.st
    atus(500).json(err);
  }
});
module.exports = router;
