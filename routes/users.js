var express = require("express");
var router = express.Router();
const moment = require("moment");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get("/search", (req, res, next) => {
  res.render("users/search");
});

router.post("/search", (req, res, next) => {
  Doctor.find(
    {
      $and: [
        {
          $or: [
            { familyName: req.body.doctorFamilyName },
            { speciality: req.body.doctorSpeciality }
          ]
        },
        { city: req.body.city }
      ]
    },
    (err, doctors) => {
      if (req.body.city === "") {
        let errors = [];
        let error = "Fill the field with the city";
        errors.push(error);
        res.render("users/search", { errors: errors });
      } else if (err) return next(err);
      else {
        res.render("users/searchResults", { doctors });
      }
    }
  );
});

router.get("/appointments", ensureLoggedIn(), (req, res, next) => {
  let user = req.user;
  User.findById(req.user._id)
    .populate("appointmentsBooked")
    .exec((err, user) => {
      if (err) return next(err);
      else {
        user.appointmentsBooked.forEach(appointment => {
          Appointment.findById(appointment._id)
            .populate("doctor")
            .exec((err, appointment) => {
              res.render("users/appointments", { user, appointment, moment });
            });
        });
      }
    });
});

// router.post("/appointments/delete", (req, res, next) => {
//   Appointment.findByIdAndRemove(req.body.appointmentId, (err, product) => {
//     if (err) return next(err);
//     res.redirect("/products");
//   });
// });

// router.post("/appointments", ensureLoggedIn(), (req, res, next) => {
//   Doctor.findByIdAndUpdate(
//     req.params.doctorId,
//     {
//       $push: {
//         comments: {
//           date: req.body.date,
//           body: req.body.review,
//           rate: req.body.rate,
//           author: req.user._id
//         }
//       }
//     },
//     (err, doctor) => {
//       if (err) return next(err);
//       res.render("doctors/doctorinfo", { doctor });
//     }
//   );
// });

router.get("/:id", ensureLoggedIn(), (req, res, next) => {
  let user = req.user;
  res.render("users/profile", { user: user });
});

router.get("/:id/edit", ensureLoggedIn(), (req, res, next) => {
  let user = req.user;
  res.render("users/edit", { user: user });
});

router.post("/:id/edit", (req, res, next) => {
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
