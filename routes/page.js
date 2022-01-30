const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");
const Message = require("../models/message");
const Image = require("../models/image");
const router = express.Router();
const sequelize = require("sequelize");

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/", (req, res, next) => {
  res.render("main", {
    title: "hi",
  });
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.get("/myroom", async (req, res) => {
  var url = req.url; // /myroom/?ref=...
  var arr = url.split("="); // [/myroom/?ref, ref값]

  if (arr.length == 1) {
    // /myroom
    if (req.user) {
      res.redirect("/myroom/?ref=" + req.user.ref);
    } else {
      res.redirect("/");
    }
  } else {
    try {
      const host = await User.findOne({
        where: { ref: arr[1] },
      });
      const msgs = await Message.findAll({
        where: { ref: arr[1] },
      });
      res.render("myroom", {
        hostuser: host,
        url: "/sendmsg/?ref=" + host.ref,
        msg: msgs,
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
});

router.get("/sendmsg", (req, res) => {
  var url = req.url; // /myroom/?ref=...
  var arr = url.split("="); // [/myroom/?ref, ref값]
  res.render("sendmsg", { url: "/post/?ref=" + arr[1] });
});

router.post("/post", async (req, res) => {
  try {
    var url = req.url; // /myroom/?ref=...
    var arr = url.split("=")[1]; // [/myroom/?ref, ref값]

    const post = await Message.create({
      sender: req.body.sendername,
      textmsg: req.body.content,
      ref: arr,
      imageId: req.body.money,
    });

    // var assetValue = await User.findOne({
    //   attributes: ['asset'],
    //   where: {ref: arr},
    // });
    // var moneyValue = await Image.findOne({
    //   attributes: ['price'],
    //   where: {id: req.body.money},
    // });
    // assetValue.asset += moneyValue.price;
    const assetValue = await Message.findAll({
      include: [
        {
          model: Image,
          // attributes: ["id", "price"],
        },
      ],
      where: {
        ref: arr,
      },
      //attributes: [[sequelize.fn("sum", sequelize.col("price")), total]],
      //group: [Message.ref],
    });
    console.log(assetValue);
    // var result;
    // assetValue.sum("price").then((sum) => {
    //   result = sum;
    // });
    // console.log(result);
    /*
    User.update(
      {
        asset: assetValue[0].total,
      },
      {
        where: { ref: arr },
      }
    );*/

    //assetValue.sum('price');
    res.redirect("/complete");
  } catch (error) {
    console.error(error);
  }
});

router.get("/complete", (req, res) => {
  res.render("complete");
});
module.exports = router;
