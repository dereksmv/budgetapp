// @route POST api/users/register
// @desc Register user
// @access Public
const express = require("express");
const router = express.Router();
const path = require('path');

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load Template model
const budgets = require("../../models/budgets")


router.post("/:user_id/new/", (req, res) => {
    var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
    var d = new Date();
    var month = monthNames[d.getMonth()]
    const newBudget = new budgets({
        date: month,
        budget: req.body.budget,
        uniqueID: req.params.user_id,
        budgetName: req.body.name
    })
    budgets.findOne({ uniqueID: req.params.user_id, date: month, budgetName: req.body.name }, (err, doc) => {
        if (err) {
            console.log(err),
            res.json({message: "There was an error updating your budget"})
        } if (doc) {
            console.log("New custom budget from user with id " + req.params.user_id);
            budgets.updateOne({ uniqueID: req.params.user_id, date: month, budgetName: req.body.name }, {$set: { 
                date: month,
                budget: req.body.budget,
                uniqueID: req.params.user_id,
                budgetName: req.body.name
             }}, (err, updated) => {
                 if (err) {
                     console.log(err)
                     res.json({message: "There was an error updating your budget"})
                 } if (updated) {
                    console.log("Updated budget for " + month + " by user with id " + req.params.user_id)
                    res.json({
                        redirect: true,
                        redirectLink: `/budgets/view/${doc.uniqueID}/${doc._id}`,
                    })
                    }
             })
        } else {
            newBudget.save(function(err, doc) {
                if (err) {
                    console.log(err)
                    res.json({ message: "there was an error saving your budget"})
                } if (doc) {
                    budgets.findOne({uniqueID: req.params.user_id, date: month, budgetName: req.body.name }, function() {
                        if (err) { console.log(err)}
                        else {
                        console.log( `/budgets/view/${doc.uniqueID}/${doc._id}`)
                        res.json({
                            redirect: true,
                            redirectLink: `/budgets/view/${doc.uniqueID}/${doc._id}`,
                        })
                    }
                    })
                }
            })
        }
    }) 
})



router.get("/retrieve-all/:user_id", (req, res) => {
    const userID = req.params.user_id
    budgets.find({ uniqueID: userID}, (err, doc) => {
        if (err) {
            console.log(err)
            res.json({error: true, message: "There was an error retrieving your budgets"})
        } if (doc) {
            console.log("New GET request from user with ID " + userID)
            res.json(doc)
        }
    })
}
)

router.get("/retrieve-one/:user_id/:budgetID", (req, res) => {
    console.log("ping")
    const userID = req.params.user_id;
    const budgetID = req.params.budgetID;
    budgets.findOne({ uniqueID: userID, _id: budgetID }, (err, doc) => {
        if (err) {
            console.log(err)
        } 
        if (doc) {
            res.json({ budgetName: doc.budgetName, budget: doc.budget})
        }    })
})

module.exports = router;