const router = require("express").Router();
const Book = require("../models/Book");


router.get("/", async(req, res) => {
    try {
        const conversation = await Book.find({

        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/:_id", async(req, res) => {
    try {
        const book = await Book.find({
            _id: req.params._id,
        });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;