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
const templates = require("../../models/Templates")

router.post("/:user_id/", (req, res) => {
    
    
    
    var userID = req.params.user_id
   
    const templateData = new templates({uniqueID: userID, template_name: req.body.templateName, categories: req.body.savedBudgetCategories})
    templates.findOne({uniqueID: userID, template_name: req.body.templateName}, (err, found) => {
        if (err) {
            res.json({message: "Something went wrong", error_code: 1})
        } if (found) {
            templates.updateOne({uniqueID: userID, template_name: req.body.templateName}, {$set: {uniqueID: userID, template_name: req.body.templateName, categories: req.body.savedBudgetCategories}}, function(err, updated) {
                if (err) {
                    res.json({message: "There was an error updating your template", error_code: 1})
                } if (updated) {
                    res.json({message: "We updated the template " + req.body.templateName})
                    
                }
            })
        }
        else {
            templateData.save(function(err, doc) {
                if (err) {
                    res.json({message: "There was an error saving your template", error_code: 3})
                    console.log(err)
                } if (doc) {
                    templates.findOne({uniqueID: userID, template_name: req.body.templateName}, (err, doc) => {
                        if (err) {
                            console.log(err)
                        } if (doc) {
                            console.log("Okay")
                            const _id = doc._id;
                            res.json({message: `/create/${_id}/${userID}`, success: true})
                        }
                    })
                    
                }
            })
    } 
    }
    
    )
})

router.get("/retrieve_one/:user_id/:budget_id", (req, res) => {
    const userID = req.params.user_id;
    const budgetID = req.params.budget_id
    console.log(`new GET request from user with id ${userID} for budget with ID ${budgetID}`)
    templates.findOne({uniqueID: userID, _id: budgetID}, (err, doc) => {
        if (err) {
            console.log(err)
            res.redirect("/budgets/new#!")
        } if (doc) {
            console.log("sending data")
            res.json({template_name: doc.template_name, categories: doc.categories})
        } else (console.log("not found"))
    })
}
)

router.get("/retrieve_all/:user_id", (req, res) => {
    const userID  = req.params.user_id;
    console.log(`new GET request from user with id ${userID} for budget with ID ${req.body._id}`)
    templates.find({uniqueID: userID}, (err, doc) =>{
        if (err) {
            console.log(err)
            res.json({message: "Something went wrong", error_code: 1})
        } if (doc) {
            console.log(`New GET request from user with ID ${userID}`)
            res.json({message: doc})
        } else {
            res.json({ message: "Build your first template and set up a custom budget" })
        }
    })
})

module.exports = router;