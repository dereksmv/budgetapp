// @route POST api/users/register
// @desc Register user
// @access Public
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
  });
  const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "demo",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
  });
  const upload = multer({ storage: storage }); 

// Load User model
const User = require("../../models/User");


router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

  // @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email
          };
  // Sign token
          jwt.sign(
            payload,
            process.env.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                user_name: user.name
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  router.post("/profile_picture/update", upload.single('profile-image'), (req, res) => {
    User.updateOne({ _id: req.body.uniqueID }, {$set: { profilePicture: req.file.url }}, (err, updated) => {
      if (err) {
        console.log(err)
      } if (updated) {
        res.json({ message: "You successfully updated your profile picture", image_url: req.file.url })
      }
    })
  })

  router.get("/:userid/profile-picture/", (req, res) => {
    console.log("ping")
      User.findOne({ _id: req.params.userid }, (err, doc) => {
        if (err) {
          console.log(err)
        } if (doc) {
          res.json({ image_url: doc.profilePicture })
        }
      })
  } )

  module.exports = router;