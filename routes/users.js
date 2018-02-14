var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Doctor = require("../models/doctor");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const flash = require("connect-flash");
const app = express();
app.use(flash());

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

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.errors = errors;
  if (res.locals.errors.length) console.log(res.locals.errors);
  next();
});

module.exports = router;
