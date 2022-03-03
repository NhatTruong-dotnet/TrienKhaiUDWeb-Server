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
// if(req.body.translator == ""){
//   const books = await book.find({
//     translator: req.body.translator
//   });
//   res.status(200).json(books);
// }else if(req.body.translator){
//   const books = await book.find({
//     translator: req.body.translator
//   });

//   res.status(200).json(books);
// }
// if(req.body.name)
// {
//   const books = await book.find({
//     name: req.body.name
//   });
//   res.status(200).json(books);
// }
// if(req.body.price)
// {
//   const books = await book.find({
//     price: req.body.price
//   });
//   res.status(200).json(books);
// }
// if(req.body.author)
// {
//   const books = await book.find({
//     author: req.body.author
//   });
//   res.status(200).json(books);
// }
// if(req.body.publishyear)
// {
//   const books = await book.find({
//     publishyear: req.body.publishyear
//   });
//   res.status(200).json(books);
// }

// }
router.post("/", async (req, res) => {
  try {
      const books = await Book.find({
        
      });
      res.status(200).json(books); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});
module.exports = router;
