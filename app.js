const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ejsLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

// models
const User = require("./models/user");
const Doctor = require("./models/doctor");

mongoose.connect("mongodb://localhost/easyDoctor");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/main");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(ejsLayout);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Passport
app.use(
  session({
    secret: "easyDoctordev",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, cb);
});

app.use(flash());

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email"
    },
    (req, username, password, done) => {
      // To avoid race conditions
      process.nextTick(() => {
        // Destructure the body
        const { name, familyName, telephone, zipCode, email } = req.body;
        console.log("The name is " + name);
        bcrypt.genSalt(14, (err, salt) => {
          if (err) return done(err);
          bcrypt.hash(password, salt, (err, hashedPass) => {
            if (err) return done(err);
            const newUser = new User({
              name,
              email,
              familyName,
              telephone,
              zipCode,
              password: hashedPass
            });
            console.log(newUser);
            newUser.save(err => {
              console.log(err);
              if (err && err.code === 11000) {
                req.flash(
                  "error",
                  `An account with email '${email}' already exists`
                );
                return done(null, false);
              }
              if (newUser.errors) {
                Object.values(newUser.errors).forEach(error => {
                  req.flash("error", error.message);
                });
                return done(null, false);
              }
              done(err, newUser);
            });
          });
        });
      });
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email"
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, isTheSame) => {
          if (err) return done(err);
          if (!isTheSame) {
            return done(null, false, { message: "Incorrect password" });
          }
          return done(null, user);
        });
      });
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.errors = req.flash("error");
  if (res.locals.errors.length) console.log(res.locals.errors);
  next();
});

//routes

app.use("/", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/", require("./routes/index"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  if (res.locals.errors.length) console.log(res.locals.errors);

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
