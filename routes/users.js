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
  //let doctorFamilyName = req.body.doctorFamilyName.charAt(0).toUpperCase() + string.slice(1)
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
    .populate({
      path: "appointmentsBooked",
      populate: {
        path: "doctor",
        model: "Doctor"
      }
    })
    .exec((err, user) => {
      res.render("users/appointments", {
        user,
        moment
      });
    });
});

router.post("/appointments/delete", ensureLoggedIn(), (req, res, next) => {
  let appointmentId = req.body.appointmentId;

  Appointment.findById(appointmentId)
    .populate("doctor")
    .exec((err, appointment) => {
      if (err) return next(err);
      else {
        let indexDoctor = appointment.doctor.appointmentsBooked.indexOf(
          appointmentId
        );
        let newAppointmentsBookedDoctor = appointment.doctor.appointmentsBooked.splice(
          indexDoctor,
          1
        );
        Doctor.findByIdAndUpdate(
          appointment.doctor,
          {
            appointmentsBooked: newAppointmentsBookedDoctor
          },
          (err, doctor) => {
            if (err) return next(err);
            else
              console.log(
                "doctor.appointmentsBooked =" + doctor.appointmentsBooked
              );
          }
        );
      }
    });

  Appointment.findByIdAndRemove(appointmentId, (err, appointment) => {
    if (err) return next(err);
    else {
      let indexUser = req.user.appointmentsBooked.indexOf(appointmentId);
      let newAppointmentsBookedUser = req.user.appointmentsBooked.splice(
        indexUser,
        1
      );

      User.findByIdAndUpdate(
        req.user._id,
        {
          appointmentsBooked: newAppointmentsBookedUser
        },
        (err, user) => {
          if (err) return next(err);
          else
            console.log("user.appointmentsBooked =" + user.appointmentsBooked);
        }
      );

      console.log("deleted from appointments db");
    }

    res.redirect("users/appointments");
  });
});

// router.post("/appointments", ensureLoggedIn(), (req, res, next) => {
//   console.log(req.body.appointmentId);
//   Appointment.findById(req.body.appointmentId)
//     .populate("doctor")
//     .exec((err, doctor) => {
//       if (err) return next(err);

//       Doctor.findByIdAndUpdate(
//         req.appointment.doctor._id,
//         {
//           $push: {
//             comments: {
//               date: req.body.date,
//               body: req.body.review,
//               rate: req.body.rate,
//               author: req.user._id
//             }
//           }
//         },
//         res.render("doctors/doctorinfo", { doctor })
//       );
//     });
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
