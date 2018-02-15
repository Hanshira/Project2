var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Doctor = require("../models/doctor");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get("/:doctorId", (req, res, next) => {
  Doctor.findById(req.params.doctorId, (err, doctor) => {
    if (err) return next(err);
    else {
      res.render("doctors/doctorInfo", { doctor });
    }
  });
});

router.post("/:doctorId", ensureLoggedIn(), (req, res, next) => {
  console.log("I'm here");
  Doctor.findByIdAndUpdate(
    req.params.doctorId,
    {
      $push: {
        comments: {
          date: req.body.date,
          body: req.body.review,
          rate: req.body.rate,
          author: req.user._id
        }
      }
    },
    (err, doctor) => {
      if (err) return next(err);
      res.render("doctors/doctorinfo", { doctor });
    }
  );
});

module.exports = router;
