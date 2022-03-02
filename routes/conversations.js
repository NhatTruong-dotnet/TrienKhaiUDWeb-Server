const router = require("express").Router();
const Conversation = require("../models/Conversation");

router.get("/:gmail", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      gmail: req.params.gmail,
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.post("/:gmail", async (req, res) => {
  try {
    const newMessage = {
      gmail: req.body.gmail,
      messageText: req.body.messageText,
    };
    const conversation = await Conversation.find({
      gmail: req.params.gmail,
    });
    if(conversation.length != 0){
      var savedConversation = await Conversation.updateOne(
        {
          gmail: req.params.gmail,
        },
        { $push: { messages: newMessage } }
      );
      console.log('updated');
      res.status(200).json(savedConversation);
    }
    else{
      console.log('insert');
      var newConversations = await Conversation.insertMany(newMessage);
      res.status(200).json(newConversations);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
