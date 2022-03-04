const router = require("express").Router();
const Users = require("../models/User");
router.get("/:gmail", async (req, res) => {
  try {
    const user = await Users.find({
      gmail: req.params.gmail,
    });
    res.status(200).json(user[0].seenList);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/:gmail", async (req, res) => {
  try {
    const user = await Users.find({
      gmail: req.body.gmail,
    });
    if (user[0].seenList.length < 5) {

     await Users.updateOne({
        gmail: req.body.gmail,
      },{
        $push:{
          seenList: {bookId: req.body.bookId}
        }
      })
      const user = await Users.find({
        gmail: req.body.gmail,
      });
      res.status(200).json(user);
    } else {
      try {
        const user = await Users.find({
          gmail: req.body.gmail,
        });
        let index = user[0].seenList.length - 1;
        user[0].seenList.map((element) => {
          if (index != 0) {
            user[0].seenList[index].bookId = user[0].seenList[index - 1].bookId;
            index--;
          }
        });
        user[0].seenList[0].bookId = req.body.bookId;
        user[0].save();
        res.status(200).json(user[0].seenList);
      } catch (error) {
        res.status(500).json(error);
        console.log(error);
      }
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    if (req.body.gmail == "admin@gmail.com") {
      const orders = await Orders.find({});
      res.status(200).json(orders);
    } else {
      res.status(404).json("Not have permission");
    }
  } catch (error) {
    res.status(500).json(err);
  }
});


module.exports = router;
