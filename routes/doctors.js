var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Doctor = require("../models/doctor");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get("/:doctorId", (req, res, next) => {
  console.log("I'm here");
  Doctor.findById(req.params.doctorId, (err, doctor) => {
    if (err) return next(err);
    else {
      console.log(doctor);
      res.render("doctors/doctorInfo", { doctor });
    }
  });
});

module.exports = router;
