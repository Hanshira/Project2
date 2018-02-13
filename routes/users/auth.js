const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 14;
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get("/signup", ensureLoggedOut(), (req, res, next) => {
  res.render("users/auth/signup");
});

router.get("/login", ensureLoggedOut(), (req, res, next) => {
  res.render("users/auth/login");
});

router.post(
  "/signup",
  ensureLoggedOut(),
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.post(
  "/login",
  ensureLoggedOut(),
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.get("/logout", ensureLoggedIn(), (req, res, next) => {
  req.logout();
  res.redirect("/");
});

router.get("/:id", ensureLoggedIn(), (req, res, next) => {
  let user = req.user;
  res.render("users/auth/profile", { user: user });
});

router.get("/:id/edit", ensureLoggedIn(), (req, res, next) => {
  let user = req.user;
  res.render("users/auth/edit", { user: user });
});

module.exports = router;
