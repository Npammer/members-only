const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Validation
const {
  body,
  validationResult
} = require("express-validator");

exports.sign_up_get = function (req, res, next) {
  res.render("sign_up_form", {
    title: "Sign Up",
  });
};

exports.sign_up_post = [
  body("email").isEmail().withMessage('Must be a valid email').normalizeEmail(),
  body("password").isLength({
    min: 6
  }).withMessage('Your password must be at least 6 characters long'),
  body("confirm-password")
  .custom((value, {
    req
  }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation is incorrect');
    }
  }),
  function (req, res, next) {
    const errors = validationResult(req);
    // Failed
    if (!errors.isEmpty()) {
      res.render("sign_up_form", {
        title: "Sign Up",
        errors: errors.array()
      });
    } else {
      // Sucsess
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        new User({
          username: req.body.email,
          password: hashedPassword,
          membership: 0,
        }).save(err => {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        });
      });
    }
  },
];