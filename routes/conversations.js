const router = require("express").Router();
const Conversation = require("../models/Conversation");


router.get("/:gmail", async(req, res) => {
    try {
        const conversation = await Conversation.find({
            gmail: req.params.gmail,
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/:gmail", async(req, res) => {
    try {
        const newMessage = {
            gmail: req.body.gmail,
            messageText: req.body.messageText,
        };
        var savedConversation = await Conversation.updateOne({
            gmail: req.params.gmail,
        }, { $push: { messages: newMessage } });
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});
module.exports = router;