// @route POST api/users/register
// @desc Register user
// @access Public
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const path = require('path');

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const goals = require("../../models/Goals");

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

router.post("/:number", upload.single('goal_images'), (req, res) => {
  console.log(req.file)
  const image = {};
  if (req.file) {
  image.url = req.file.url;
  image.id = req.file.public_id;
  }
  console.log(image.url)
  goalNumber = req.params.number
  goalObj = new goals({
    goal_number: goalNumber,
    goal_title: req.body.goal_title,
    goal_desc: req.body.goal_desc,
    goal_cost: req.body.goal_cost,
    goal_saved: req.body.goal_saved,
    image_url: image.url,
    uniqueID: req.body.uniqueID
  })
  goals.findOne({ "uniqueID": req.body.uniqueID, "goal_number": goalNumber }, function(err, found) {
    if (err) {
      console.log(err);
    } if (found) {
      console.log("found")
      //update

      if (req.file) {
      goals.updateOne({ "uniqueID": req.body.uniqueID, "goal_number": goalNumber }, { $set: { "goal_title": req.body.goal_title, "goal_desc": req.body.goal_desc, "goal_cost": req.body.goal_cost, "goal_saved": req.body.goal_saved, "image_url": image.url } }, function(err, doc) {
        if (err) {
          console.log(err);
          res.json({message: "oops! Something went wrong!"})
        } if (doc) {
          console.log("User with id " + req.body.uniqueID + " updated their goal " + goalNumber + ". Savings: " + req.body.goal_saved)
          res.json({message: `You updated your goal!`})
        }
      })
      }
      else {
        goals.updateOne({ "uniqueID": req.body.uniqueID, "goal_number": goalNumber }, { $set: { "goal_title": req.body.goal_title, "goal_desc": req.body.goal_desc, "goal_cost": req.body.goal_cost, "goal_saved": req.body.goal_saved } }, function(err, doc) {
          if (err) {
            console.log(err);
            res.json({message: "oops! Something went wrong!"})
          } if (doc) {
            console.log("User with id " + req.body.uniqueID + " updated their goal " + goalNumber + ". Savings: " + req.body.goal_saved)
            res.json({message: `You updated your goal!`})
          }
        })
        } 

    } else {
        //create
        goalObj.save(function(err, doc) {
          if(err) {
            console.log(err)
            res.json({ message: "Oops! Something went wrong!" })
          } else {
            console.log(`New goal record created for user with id ${req.body.uniqueID}. Goal number ${goalNumber} created!`)
            res.json({message: "You created a new goal!"})
          }
        })
      }
  })
})

router.get("/:userid/", function(req, res) {
  goals.find({ uniqueID: req.params.userid }, function(err, doc) {
    if (err) {
      console.log(err)
    } if (doc) {
      res.json({doc, message: "found"})
    } else {
      res.json({"message": "not found"})
    }
  })
})

router.get("/:userid/:number", function(req, res) {
  goals.findOne({ uniqueID: req.params.userid, goal_number: req.params.number }, function(err, doc) {
    if (err) {
      console.log(err)
    } if (doc) {
      res.json({doc, message: "record found"})
    } else {
      res.json({message: "not found"})
    }
  })
})



module.exports = router;