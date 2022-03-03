const router = require("express").Router();
const Orders = require("../models/Order");

router.get("/:gmail", async (req, res) => {
  try {
    const order = await Orders.find({
      gmail: req.params.gmail,
      isCheckout: false,
    });
    res.status(200).json(order[0].orderList);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.post("/:gmail", async (req, res) => {
  try {
    let newOrder = {
      bookId: req.body.bookId,
      price: req.body.price,
      amount: req.body.amount,
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
        { $push: { orderList: newOrder } }
      );
      console.log("updated");
      res.status(200).json(savedOrders);
    } else {
      console.log("inserted");
      let newOrder = {
        gmail: req.params.gmail,
        orderList: [
          {
            bookId: req.body.bookId,
            price: req.body.price,
            amount: req.body.amount,
          },
        ],
      };
      var newOrderSaved = await Orders.create(newOrder);
      res.status(200).json(newOrderSaved);
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

router.put("/:gmail", async (req, res) => {
  try {
    let newOrder = {
      bookId: req.body.bookId,
      price: req.body.price,
    };
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
