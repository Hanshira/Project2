var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Doctor = require("../models/doctor");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get("/search", ensureLoggedIn(), (req, res, next) => {
  res.render("users/search");
});

router.post("/search", ensureLoggedIn(), (req, res, next) => {
  console.log("I'm here");
  Doctor.find(
    ({
      $or: [
        { familyName: req.body.doctorFamilyName },
        { speciality: req.body.doctorSpeciality }
      ]
    },
    { "address[0].city": req.body.city }),
    (err, doctor) => {
      console.log(doctor);
    }
  );
});

router.get("/:id", ensureLoggedIn(), (req, res, next) => {
  let user = req.user;
  res.render("users/profile", { user: user });
});

router.get("/:id/edit", ensureLoggedIn(), (req, res, next) => {
  console.log("I'm here");
  let user = req.user;
  res.render("users/edit", { user: user });
});

router.post("/:id/edit", (req, res, next) => {
  console.log(req.user);
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      familyName: req.body.familyName,
      telephone: req.body.telephone,
      zipCode: req.body.zipCode
    },
    (err, user) => {
      if (err) return next(err);
      else res.redirect("/");
    }
  );
});

module.exports = router;
