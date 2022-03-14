const router = require("express").Router();
const Users = require("../models/User");
const Bills = require("../models/Bill");
const Orders = require("../models/Order");
const User = require("../models/User");

router.post("/", async(req, res) => {
    try {
        const bill = await Bills.find({
            gmail: req.body.gmail,
            isDelivery: true,
            isSucessful: true,
        });

        var arrPayment = [];
        if (bill.length != 0) {
            await Bills.find({
                gmail: req.body.gmail,
                isDelivery: true,
                isSucessful: true,
            }).then((b) => {
                b.map((o) => {
                    if (o.isDelivery == true && o.isSucessful == true) {
                        if (o.totalPayment >= 500000) {
                            arrPayment.push(o.totalPayment);
                        }
                    }
                });
            });
        }

        var user = await Users.find({
            gmail: req.body.gmail,
        }).then((u) => {
            try {
                console.log("u: " + u);
                u.forEach((p) => {
                    var addedPointList = p.addedPointLogs;
                    var logPoint = {
                        addedPoint: 0
                    };
                    for (let i = 0; i < arrPayment.length; i++) {

                        if (arrPayment[i] >= 500000 && arrPayment[i] < 1150000) {
                            p.currentPoint += 10;
                            logPoint.addedPoint += 10;
                            addedPointList.push(logPoint);

                        } else if (arrPayment[i] >= 1150000) {
                            p.currentPoint += 25;
                            logPoint.addedPoint = 25;
                            addedPointList.push(logPoint);
                        }
                    }
                    p.save(user);
                });
                res.status(200).json({ "status": 200, "message": "Add point success" });
            } catch (error) {
                res.status(500).json({ "status": 500, "message": "Error find user" });
            }
        });

    } catch (error) {
        res.status(500).json({ "status": 500, "message": "Error Bill" });
    }
});

router.put("/UpdateVip/:gmail", async(req, res) => {
    try {
        Users.findOne({
          gmail: req.params.gmail
        }).exec((err, user) => {
          if(user.currentPoint<"100"){
            res.status(500).json({"message":"Not enough points"});
          }else{
            user.isVipMember = true;
            user.save();
            return res.status(200).json({
              message: "Update Completely"
            })
          }
        });
      } catch (error) {
        res.status(500).json("Update Fail");
      }
    });


module.exports = router;