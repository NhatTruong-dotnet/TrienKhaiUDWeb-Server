const router = require("express").Router();
const Bills = require("../models/Bill");
const sendMail = require("../common/email");
const Orders = require("../models/Order");
const Users = require("../models/User");
router.get("/:gmail", async (req, res) => {
  // get toàn bộ đơn hàng của user
  try {
    const bill = await Bills.find({ gmail: req.params.gmail });
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/detail/:OrderId", async (req, res) => {
  // get detaill for bill
  try {
    const bill = await Orders.findById(req.params.OrderId);
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    function generateInvoice(invoiceId, orderList) {
      //https://www.bootdey.com/snippets/view/simple-invoice-receipt-email-template#html
      function generateBody() {
        let result = "";
        let total = 0;
        orderList.map((element) => {
          result += ` <tr>
                        <td style="padding: 5px 0;">${element.bookName}</td>
                        <td style="padding: 5px 0;" class="alignright" width="30%">${new Intl.NumberFormat(
                          "vi-VN",
                          { style: "currency", currency: "VND" }
                        ).format(element.price * element.amount)}</td>
                      </tr>`;
          total += parseInt(element.price * element.amount);
        });
        result += `
        <tr>
        <td style="padding: 5px 0;">Phí vận chuyển</td>
        <td style="padding: 5px 0;" class="alignright" width="30%">${new Intl.NumberFormat(
          "vi-VN",
          { style: "currency", currency: "VND" }
        ).format(15000)}</td>
      </tr>
        <tr class="total">
                    <td style="padding: 5px 0;" class="alignright" width="80%">Total</td>
                    <td style="padding: 5px 0;" class="alignright"width="100%">${new Intl.NumberFormat(
                      "vi-VN",
                      { style: "currency", currency: "VND" }
                    ).format(total + 15000)}</td>
                  </tr>`;
        return result;
      }
      let body = generateBody();
      return `<table class="body-wrap" style=" margin: 0;
      padding: 0;
      font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
      box-sizing: border  -box;
      font-size: 14px;
      background-color: #f6f6f6;
      width: 100%;">
      <tbody><tr>
          <td></td>
          <td class="container" style=" display: block !important;
          max-width: 600px !important;
          margin: 0 auto !important;
          /* makes it centered */
          clear: both !important;" width="1200">
              <div class="content" style="  max-width: 600px;
              margin: 0 auto;
              display: block;
              padding: 20px;">
                  <table class="main" style=" background: #fff;
                  border: 1px solid #e9e9e9;
                  border-radius: 3px;" width="100%" cellpadding="0" cellspacing="0">
                      <tbody><tr>
                          <td class="content-wrap aligncenter" style=" padding: 20px;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                  <tbody><tr>
                                      <td class="content-block" style="padding: 0 0 20px;">
                                          <h2>Thanks for using our service</h2>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td class="content-block" style="padding: 0 0 20px;">
                                          <table class="invoice" style="width:70%;  margin: 40px auto;
                                          text-align: left;
                                          width: 80%;">
                                              <tbody><tr>
                                                  <td>${req.body.gmail}<br>Invoice #${invoiceId}<br></td>
                                              </tr>
                                              <tr>
                                                  <td style="padding: 5px 0;">
                                                      <table class="invoice-items" cellpadding="0" cellspacing="0">
                                                          <tbody>
                                                          <td style="padding: 5px 0;">
                                                            ${body}
                                                          </td>
                                                      </tbody></table>
                                                  </td>
                                              </tr>
                                          </tbody></table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td class="content-block" style="padding: 0 0 20px;">
                                          BookStore Inc. 180 Cao Lo, Ho Chi Minh
                                      </td>
                                  </tr>
                              </tbody></table>
                          </td>
                      </tr>
                  </tbody></table>
                  <div class="footer" style=" width: 100%;
                  clear: both;
                  color: #999;
                  padding: 20px;">
                      <table width="100%">
                          <tbody><tr>
                              <td class="aligncenter content-block">Questions? Email <a style="color: #999;font-size: 12px;" href="mailto:">support@bookstore.inc</a></td>
                          </tr>
                      </tbody></table>
                  </div></div>
          </td>
          <td></td>
      </tr>
              </tbody></table>`;
    }
    let newBill = {
      orderId: req.body.orderId,
      paymentMethod: req.body.paymentMethod,
      gmail: req.body.gmail,
      totalPayment: req.body.totalPayment,
      sdt: req.body.phoneNumber,
      adress: req.body.deliveryAddress,
    };

    BillSaved = await Bills.create(newBill);
    let order = await Orders.findById(req.body.orderId).then((data) => {
      let body = generateInvoice(BillSaved._id, data.orderList);
      sendMail(req.body.toUser, "Hóa đơn mua hàng BookStore", body);
      data.isCheckout = true;
      data.save();
      res.status(200).json(body);
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get("/status/:status", async (req, res) => {
  try {
    if (req.params.status === "all") {
      const bill = await Bills.find();
      res.status(200).json(bill);
    } else if (req.params.status === "success") {
      const bill = await Bills.find({ isDelivery: true, isSucessful: true });
      res.status(200).json(bill);
    } else if (req.params.status === "fail") {
      const bill = await Bills.find({ isDelivery: true, isSucessful: false });
      res.status(200).json(bill);
    } else {
      const bill = await Bills.find({ isDelivery: false});
      res.status(200).json(bill);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/detail/updated-delivery/:OrderId", async (req, res) => {
  //update đơn hàng của admin cấp 1
  try {
    const bill = await Bills.find({
      orderId: req.params.OrderId,
    }).then((data) => {
      data[0].isDelivery = true;
      data[0].isSucessful = req.body.isSucessful;
      data[0].save();
    });
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
