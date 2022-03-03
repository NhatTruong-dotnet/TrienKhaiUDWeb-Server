const router = require("express").Router();
const Book = require("../models/Book");

router.get("/", async (req, res) => {
  try {
    if(req.body.translator == ""){
      const books = await Book.find({
        translator: req.body.translator
      });
      res.status(200).json(books);
    }else if(req.body.translator){
      const books = await Book.find({
        translator: req.body.translator
      });
    
      res.status(200).json(books);
    }
    if(req.body.name)
    {
      const books = await Book.find({
        name: req.body.name
      });
      res.status(200).json(books);
    }
    if(req.body.price)
    {
      const books = await Book.find({
        price: req.body.price
      });
      res.status(200).json(books);
    }
    if(req.body.author)
    {
      const books = await Book.find({
        author: req.body.author
      });
      res.status(200).json(books);
    }
    if(req.body.publishYear)
    {
      const books = await Book.find({
        publishYear: req.body.publishYear
      });
      res.status(200).json(books);
    }

  } catch (error) {
    res.status(500).json(err);
  }
});

// router.post("/:gmail", async (req, res) => {
//   try {
//     const newMessage = {
//       gmail: req.body.gmail,
//       messageText: req.body.messageText,
//     };
//     var savedConversation = await Conversation.updateOne(
//       {
//         gmail: req.params.gmail,
//       },
//       { $push: { messages: newMessage } }
//     );
//     res.status(200).json(savedConversation);
//   } catch (error) {
//     res.status(500).json(error);
//     console.log(error);
//   }
// });

module.exports = router;
