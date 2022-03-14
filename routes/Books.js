const router = require("express").Router();
const Book = require("../models/Book");

router.post("/insertBook", async (req, res) => {
  try {
      let newBook = {
        name: req.body.name,
        publisher: req.body.publisher,
        suppiler: req.body.suppiler,
        numberInStock: req.body.numberInStock,
        numberDelivery: req.body.numberDelivery,
        author: req.body.author,
        translator: req.body.translator,
        publishYear: req.body.publishYear,
        bookLayout: req.body.bookLayout,
        price: req.body.price,
        quantityOfPage: req.body.quantityOfPage,
        describe: req.body.describe

      };
      var newBookSaved = await Book.create(newBook);
      res.status(200).json("Inserted");
  } catch (error) 
  {
    res.status(500).json(error);
    console.log(error);
  }
});
router.get("/id/:id", async (req, res) => {
  try {
      const books = await Book.findById(req.params.id);
      res.status(200).json(books); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});
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
      const books = await Book.find({

      });
      
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
      res.status(200).json("Deleted"); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});
router.put("/updateBook/:_id", async (req, res) => {
  try {
    Book.findOne({
      _id: req.params._id
    }).exec((err, book) => {
      if (err) {
        res.status(500).json({message:"Update Failed"});
      } else {
        book.name = req.body.name;
        book.publisher = req.body.publisher;
        book.suppiler = req.body.suppiler;
        book.numberInStock = req.body.numberInStock;
        book.numberDelivery = req.body.numberDelivery;
        book.author = req.body.author;
        book.translator = req.body.translator;
        book.publishYear = req.body.publishYear;
        book.bookLayout = req.body.bookLayout;
        book.price = req.body.price;
        book.quantityOfPage = req.body.quantityOfPage;
        book.describe = req.body.describe;
        book.updatedAt = req.body.updatedAt;
        book.profilePicture = req.body.picture;
        book.save();
        return res.status(200).json({
          message: "Update Completed"
        })
      }
    });
  } catch (error) {
    res.status(500).json(error);
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
