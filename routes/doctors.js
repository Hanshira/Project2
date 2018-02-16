var express = require("express");
var router = express.Router();
const moment = require("moment");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");
const $ = require("jquery");
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
  Doctor.findById(req.params.doctorId, (err, doctorFound) => {
    const newAppointment = new Appointment({
      date: req.body.date,
      hour: req.body.hour,
      patient: req.user._id,
      doctor: req.params.doctorId,
      address: {
        street: doctorFound.address[0].street,
        zipCode: doctorFound.address[0].zipCode,
        city: doctorFound.city,
        floor: doctorFound.address[0].floor,
        lift: doctorFound.address[0].lift
      }
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
        (err, doctor) => {}
      );

      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: {
            appointmentsBooked: newAppointmentSaved._id
          }
        },
        (err, user) => {}
      );

      if (err) return next(err);

      User.findById(req.user._id)
        .populate("appointmentsBooked")
        .exec((err, user) => {
          if (err) return next(err);

          Doctor.findById(req.params.doctorId, (err, doctor) => {
            res.render("users/appointmentBooked", {
              user: user,
              doctor,
              moment
            });
          });
        });
    });
  });
});

module.exports = router;
