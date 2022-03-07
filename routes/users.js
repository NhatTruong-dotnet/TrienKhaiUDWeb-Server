const router = require("express").Router();
const User = require("../models/User");
const Books = require("../models/Book");
const {
  json
} = require("express");
// const session = require('express-session');



router.get("/review/:gmail", async (req, res) => {
  try {
    console.log('run');
    const user = await Books.find({
      "rating.gmail": req.params.gmail
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await User.find({
      gmail: req.query.gmail
    });
    // const user = await User.find({passwordHash:req.query.passwordHash});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(err);
  }
});
router.post("/", async (req, res) => {
  try {
    const user = await User.find({
      gmail: req.body.gmail
    });
    // const user = await User.find({passwordHash:req.body.passwordHash});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(err);
  }
});
//Xem thông tin account
router.get("/profile/:gmail", async (req, res) => {
  try {
    const user = await User.findOne({
      gmail: req.params.gmail,
    });
    const USER = {
      gmail: user.gmail,
      profilePicture: user.profilePicture,
      username: user.username,
      phone: user.phone,
      shippingAdress: user.shippingAdress,
      isVipMember: user.isVipMember,
      addedPointLogs: user.addedPointLogs,
      currentPoint: user.currentPoint,
      seenList: user.seenList,
      wishList: user.wishList
    };
    res.status(200).json(USER);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Update Info Account
router.put("/updateProfile/:gmail", async (req, res) => {
  try {
    User.findOne({
      gmail: req.params.gmail
    }).exec((err, user) => {
      if (err) {
        res.status(500).json({message:"Update Failed"});
      } else {
        user.username = req.body.username;
        user.phone = req.body.phone;
        user.profilePicture = req.body.picture;
        if(user.shippingAdress.length > 0 && user.shippingAdress.length > req.body.index){
          if(req.body.isDefault == "true"){
            user.shippingAdress.forEach((item)=>{
              item.isDefault = false;
            });
          }
          user.shippingAdress[req.body.index].isDefault = req.body.isDefault;
          user.shippingAdress[req.body.index].address = req.body.address;
          user.save();
          return res.status(200).json({
            message: "Update Completely"
          })
        }else{
          if(req.body.isDefault == "true"){
            user.shippingAdress.forEach((item)=>{
              item.isDefault = false;
            });  
          }
          var shippingAdress={
            isDefault : req.body.isDefault,
            address : req.body.address
          };
          user.shippingAdress.push(shippingAdress);
          user.save();
          return res.status(200).json({
            message: "Update Completely"
          })
        }
        
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;