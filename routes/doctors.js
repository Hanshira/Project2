var express = require("express");
var router = express.Router();
const moment = require("moment");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");

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

router.get("/:doctorId/availability", ensureLoggedIn(), (req, res, next) => {
  Doctor.findById(req.params.doctorId, (err, doctor) => {
    if (err) return next(err);
    else {
      res.render("doctors/availability", { doctor, moment });
    }
  });
});

router.post("/:doctorId/availability", ensureLoggedIn(), (req, res, next) => {
  console.log("I'm here");

  const newAppointment = new Appointment({
    date: req.body.date,
    patient: req.user._id,
    doctor: req.params.doctorId
  });

  newAppointment.save((err, newAppointmentSaved) => {
    if (newAppointment.errors) {
      Object.values(newAppointment.errors).forEach(error => {
        req.flash("error", error.message);
      });
      return res.redirect("/:doctorId/availability");
    }

    Doctor.findByIdAndUpdate(
      req.params.doctorId,
      {
        $push: {
          appointmentsBooked: newAppointmentSaved._id
        }
      },
      (err, doctor) => {
        console.log("DEBUG err, doctor", err, doctor);
      }
    );

    User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          appointmentsBooked: newAppointmentSaved._id
        }
      },
      (err, user) => {
        console.log("DEBUG err, user", err, user);
      }
    );

    if (err) return next(err);

    User.findById(req.user._id)
      .populate("appointmentsBooked")
      .exec((err, user) => {
        if (err) return next(err);

        Doctor.findById(req.params.doctorId, (err, doctor) => {
          res.render("users/appointments", { user: user, doctor, moment });
        });
      });
  });
});

module.exports = router;
