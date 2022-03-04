const router = require("express").Router();
const Bills = require("../models/Bill");
const Users = require("../models/User");
const Orders = require("../models/Order");

router.get("/:billId", async (req, res) => {
  try {
    const bill = await Bills.findById(req.params.billId);
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    let newBill = {
      orderId: req.body.orderId,
      paymentMethod: req.body.paymentMethod
    };

    BillSaved = await Bills.create(newBill);
    res.status(200).json(BillSaved);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const bill = await Bills.find();
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:gmail", async (req, res) => {
  try {
    const order = await Orders.find({
      gmail: req.params.gmail,
      isCheckout: false,
    });
    if (order.length != 0) {
      var savedOrders = await Orders.findOne({
        gmail: req.params.gmail,
        isCheckout: false,
      });
      savedOrders.orderList.map((order) => {
        if (order.bookId === req.body.bookId) {
          order.price = req.body.price;
          order.amount = req.body.amount;
        }
      });
      res.status(200).json(savedOrders);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.delete("/:gmail", async (req, res) => {
  try {
    let newOrder = {
      bookId: req.body.bookId,
    };
    const order = await Orders.find({
      gmail: req.params.gmail,
      isCheckout: false,
    });
    if (order.length != 0) {
      var savedOrders = await Orders.updateOne(
        {
          gmail: req.params.gmail,
          isCheckout: false,
        },
        {
          $pull: {
            orderList: { bookId: req.body.bookId },
          },
        }
      );
      res.status(200).json(savedOrders);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
