const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.get("/", (req, res) => {
  console.log("http://localhost:3001/api/");
  res.send({ title: "hello react!" });
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  req.redirect("/api");
});

router.get("/kakao", passport.authenticate("kakao"));
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/api",
  }),
  (req, res) => {
    // console.log("여기서부터 데이터확인\n" + req.user.nick);
    // res.send(`${req.user.nick}`);
    res.redirect("http://localhost:3000/");
  }
);
module.exports = router;
