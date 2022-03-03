const router = require("express").Router();
const User = require("../models/User");


router.get("/", async(req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/:gmail", async(req, res) => {
    try {
        const user = await User.find({
            gmail: req.params.gmail,
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;