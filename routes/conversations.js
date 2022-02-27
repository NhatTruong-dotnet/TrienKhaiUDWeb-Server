const router = require("express").Router();
const Conversation = require("../models/Conversation");


router.get("/:gmail", async(req, res)=>{
    try {
        const conversation = await Conversation.find({
            gmail :req.params.userId
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(err);
    }
})
module.exports = router;
