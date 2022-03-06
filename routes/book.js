const router = require("express").Router();
const { ObjectId } = require("bson");
const { crossOriginResourcePolicy } = require("helmet");
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
            _id: req.params._id

        });

        var ratingUser;
        book.forEach(item => {
            var ratings = item.rating;
            ratings.forEach((r) => {
                if (r.gmail == req.body.gmail) {
                    ratingUser = r;
                }
            })

        });

        res.status(200).json(book);

    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/:_id", async(req, res) => {
    try {

        const book = await Books.find({
            _id: req.params._id,
        });

        console.log("book", book);
        var ratingUser;
        book.forEach(item => {
            var ratings = item.rating;
            ratings.forEach((r) => {
                if (r.gmail == req.body.gmail) {
                    ratingUser = r;
                }
            })
        });

        var index = book[0].rating.findIndex((rating => rating.gmail === req.body.gmail));
        console.log("index: ", index);

        const user = await User.find({
            gmail: req.body.gmail,
        });

        if (user.length != 0) {
            if (typeof(ratingUser) == "undefined") { //

                // add array rating auto create _id
                var newUserRating = await Books.findOneAndUpdate({ _id: req.params._id }, {
                        $push: {
                            rating: {
                                gmail: req.body.gmail,
                                ratingValue: req.body.ratingValue,
                                commentText: req.body.commentText,
                            }
                        }
                    },
                    (error, success) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                        }
                    }
                );
                console.log("Inserted a new User in Rating");
                res.status(200).json(newUserRating);

            }
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

router.put("/:_id", async(req, res) => {
    try {
        const currentBook = await Books.find({
            _id: req.params._id,
        });
        if (currentBook.length != 0) {
            var bookC = await Books.find({
                _id: req.params._id,
            }).then((b) => {
                try {
                    b.forEach((c) => {
                        c.rating.map((item) => {
                            if (item.gmail === req.body.gmail) {
                                item.ratingValue = req.body.ratingValue;
                            }
                        });
                        c.save(bookC);
                    });
                } catch (error) {
                    // console.log(error);
                    res.status(500).json("{'status': 500,'message': ' Update Failed '}");
                }
            });
            const cb = await Books.find({
                _id: req.params._id,
            });
            // res.status(200).json(cb);
            res.status(200).json("{'status': 200,'message': 'Updated success '}");
        } else {
            res.status(404).json("{'status': 404,'message': ' _id not exists '}");
        }

    } catch (error) {

        res.status(500).json("{'status': 500,'message': ' Update Failed '}");
    }

});


module.exports = router;