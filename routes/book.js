const router = require("express").Router();
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
        var book = await Books.find({
            _id: req.params._id,
        });

        // var ratingUser;
        var ratingList = [];
        book.forEach(item => {
            var ratings = item.rating;
            ratings.forEach((r) => {
                if (r.gmail == req.body.gmail) {
                    r.ratingValue = req.body.ratingValue;
                    // ratingUser = r;
                }
                ratingList.push(r);
            })

        });

        var upAt = new Date();
        var timestemp = upAt.getTime();
        var where = "{ '_id':" + req.params._id + "}";
        var setUpdate = "{'rating': " + ratingList + "}";

        console.log("setUpdate:", setUpdate);
        Books.updateOne(where, {
                $set: setUpdate,
                upsert: true
            },
            (error, success) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Hello success");
                }
            }
        );
        res.status(200).json(book);

    } catch (error) {
        res.status(500).json(error);
    }

});


module.exports = router;