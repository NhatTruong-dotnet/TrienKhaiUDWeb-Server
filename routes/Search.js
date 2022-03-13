const router = require("express").Router();
const Book = require("../models/Book");

//--------------------Search Price with Translator------------------//
router.get("/trans.price1", async (req, res) => {
  try {
      const books = await Book.find( { $and: [{ translator: { $ne: "null"} }, { price: { $lte: 50000 } }] } );
      res.status(200).json(books); 
  }
 catch (error) {
    res.status(500).json(err);
  } 
});
router.get("/trans.price2", async (req, res) => {
  try {
      const books = await Book.find( { $and: [{ translator: { $ne: "null"} }, { price: { $gte: 50000 } }, { price: { $lte: 150000 } } ] } );
      res.status(200).json(books); 
    }

 catch (error) {
    res.status(500).json(err);
  } 

});
router.get("/trans.price3", async (req, res) => {
  try {
      const books = await Book.find( { $and: [{ translator: { $ne: "null"} }, { price: { $gte: 150000 } }, { price: { $lte: 300000 } } ] } );
      res.status(200).json(books); 
    }

 catch (error) {
    res.status(500).json(err);
  } 

});
router.get("/trans.price4", async (req, res) => {
  try {
      const books = await Book.find( { $and: [{ translator: { $ne: "null"} },{ price: { $gte: 300000 } } ] } );
      res.status(200).json(books); 
    }

 catch (error) {
    res.status(500).json(err);
  } 

});
router.get("/trans.price5", async (req, res) => {
  try {
      const books = await Book.find( { $and: [{ translator: { $eq: "null"} },{ price: { $lte: 50000 } } ] } );
      res.status(200).json(books); 
    }

 catch (error) {
    res.status(500).json(err);
  } 

});
router.get("/trans.price6", async (req, res) => {
  try {
      const books = await Book.find( { $and: [{ translator: { $eq: "null"} },{ price: { $gte: 50000 } }, { price: { $lte: 150000 } }  ] } );
      res.status(200).json(books); 
    }

 catch (error) {
    res.status(500).json(err);
  } 

});
router.get("/trans.price7", async (req, res) => {
  try {
      const books = await Book.find( { $and: [{ translator: { $eq: "null"} }, { price: { $gte: 150000 } }, { price: { $lte: 300000 } }  ] } );
      res.status(200).json(books); 
    }

 catch (error) {
    res.status(500).json(err);
  } 

});
router.get("/trans.price8", async (req, res) => {
  try {
      const books = await Book.find( { $and: [{ translator: { $eq: "null"} }, { price: { $gte: 300000 } }] } );
      res.status(200).json(books); 
    }

 catch (error) {
    res.status(500).json(err);
  } 

});
//--------------------Search Price with Translator------------------//


module.exports = router;
