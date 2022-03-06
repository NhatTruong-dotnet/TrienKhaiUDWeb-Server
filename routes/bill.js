const router = require("express").Router();
const Bills = require("../models/Bill");
const Users = require("../models/User");
const Orders = require("../models/Order");

router.get("/:billId", async (req, res) => {
  if (req.body.gmail !== "") {
    try {
      const listOrderByGmail = await Orders.find({
        gmail: req.body.gmail,
        isCheckout: true,
      });
      listBillByEmail = new Array();
      async function getBill(arr) {
       listOrderByGmail.map(async (finishedOrder) => {
          let innerBillByOrder = await Bills.find({
            orderId: finishedOrder.id,
          }).then((data) => arr[arr.length] = data[0]);
        })
      }
      async function wait(){
        await getBill(listBillByEmail)
        res.status(200).json(listBillByEmail);
      }
      await wait();
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    try {
      const bill = await Bills.findById(req.params.billId);
      res.status(200).json(bill);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

router.post("/", async (req, res) => {
  try {
    let newBill = {
      orderId: req.body.orderId,
      paymentMethod: req.body.paymentMethod,
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

module.exports = router;
