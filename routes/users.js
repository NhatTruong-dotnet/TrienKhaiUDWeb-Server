const router = require("express").Router();
const User = require("../models/User");
// const session = require('express-session');

router.get("/", async (req, res) => {
  try {
    const user = await User.find({gmail:req.query.gmail});
    // const user = await User.find({passwordHash:req.query.passwordHash});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.find({gmail:req.body.gmail});
    // const user = await User.find({passwordHash:req.body.passwordHash});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;