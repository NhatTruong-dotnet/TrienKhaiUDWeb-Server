const router = require("express").Router();
const Books = require("../models/Book");
const User = require("../models/User");


router.get("/", async(req, res) => {
    try {
        const books = await Books.find({

        });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/:_id", async(req, res) => {
    try {

        const book = await Books.find({
            _id: req.params._id,

        });


        res.status(200).json(book[0].rating);
    } catch (error) {
        res.status(500).json(error);
    }
});





module.exports = router;