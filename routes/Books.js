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
router.get("/getID/:_id", async (req, res) => {
  try {
      const books = await Book.findOne({_id: req.params._id });
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


router.get("/review/:id", async (req, res) => {
  try {
      const books = await Book.findById(req.params.name);
      res.status(200).json(books.rating); 
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

        book.rating[req.body.index].gmail = req.body.gmail;
        book.rating[req.body.index].ratingValue = req.body.ratingValue;
        book.rating[req.body.index].ratingDate = req.body.ratingDate;
        book.rating[req.body.index].commentText = req.body.commentText;

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
          message: "Update Completely"
        })
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.get("/CreateBook/:_id", async (req, res) => {
//   try {
//     Book.findOne({
//       _id: req.params._id
//     }).exec((err, book) => {
//       if (err) {
//         res.status(500).json({message:"Update Failed"});
//       } else {
//         book.name = req.body.name;
//         book.publisher = req.body.publisher;
//         book.suppiler = req.body.suppiler;
//         book.numberInStock = req.body.numberInStock;
//         book.numberDelivery = req.body.numberDelivery;

//         book.rating[req.body.index].gmail = req.body.gmail;
//         book.rating[req.body.index].ratingValue = req.body.ratingValue;
//         book.rating[req.body.index].ratingDate = req.body.ratingDate;
//         book.rating[req.body.index].commentText = req.body.commentText;

//         book.author = req.body.author;
//         book.translator = req.body.translator;
//         book.publishYear = req.body.publishYear;
//         book.bookLayout = req.body.bookLayout;
//         book.price = req.body.price;
//         book.quantityOfPage = req.body.quantityOfPage;
//         book.describe = req.body.describe;
//         book.updatedAt = req.body.updatedAt;
//         book.profilePicture = req.body.picture;
//         book.save();
//         return res.status(200).json({
//           message: "Update Completely"
//         })
//       }
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
module.exports = router;
