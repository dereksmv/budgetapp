const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
var ObjectID = require('mongodb').ObjectId;



//Load the schema for our user's debts and income
const debtsAndIncome = require("../../models/DebtsAndIncome")
const assets = require("../../models/Assets")
const liabilities = require("../../models/Liabilties")

router.post("/dashboard/:button_num", (req, res) => {
    var button_num = req.params.button_num;
    function turnButtonNumIntoString() {
        if (button_num === "income") {
            return "income"
        } if (button_num === "debt") {
            return "debt"
        } else {
            return "savings"
        }
    }

    
    debtsAndIncome.findOne({"uniqueID": ObjectID(req.body.uniqueID)}, function(err, doc) {
        if (err) {
            console.log(err )
        } 
        if (doc) {
            debtsAndIncome.findOne({"uniqueID": ObjectID(req.body.uniqueID)}, function(err, doc) {
                if (err) {
                    console.log(err)
                }
                if (button_num == "debt") {
                    debtsAndIncome.updateOne({ "uniqueID": ObjectID(req.body.uniqueID) }, { $set: {debt: req.body.debt} }, function(err, doc) {
                        if (err) console.log(err)
                        if (doc) {
                            console.log(`Updated record: ${button_num} by value ${req.body.debt} for user with id ${ObjectID(req.body.uniqueID)}`)
                            res.json({message: "success!"})
                        }
                    })
        }
        if (button_num == "savings") {
            debtsAndIncome.updateOne({ "uniqueID": ObjectID(req.body.uniqueID) }, { $set: {savings: req.body.savings} }, function(err, doc) {
                if (err) console.log(err)
                if (doc) {
                    console.log(`Updated record: ${button_num} by value ${req.body.savings} for user with id ${ObjectID(req.body.uniqueID)}`)
                    res.json({message: "success!"})
                }
            })
                }
                if (button_num == "income") {
                    debtsAndIncome.updateOne({ "uniqueID": ObjectID(req.body.uniqueID) }, { $set: {income: req.body.income} }, function(err, doc) {
                        if (err) console.log(err)
                        if (doc) {
                            console.log(`Updated record: ${button_num} by value ${req.body.income} for user with id ${ObjectID(req.body.uniqueID)}`)
                            res.json({message: "success!"})
                        }
                    })
        }
    })
  }
                else {
                    if (button_num === "income")
                    var dashboardState = new debtsAndIncome({
                        uniqueID: req.body.uniqueID,
                        income: req.body.income,
                        debt: "Enter your debts",
                        savings: "Enter your savings"
                    })
                  dashboardState.save(function(err, doc) {
                      if (err) {
                          console.log(err)
                      } else {
                          console.log(`created new record for ${ObjectID(req.body.uniqueID)}`);
                          }
                  })
                  if (button_num === "savings")
                    var dashboardState = new debtsAndIncome({
                        uniqueID: req.body.uniqueID,
                        income: "Enter your income",
                        debt: "Enter your debts",
                        savings: req.body.savings
                    })
                  dashboardState.save(function(err, doc) {
                      if (err) {
                          console.log(err)
                      } else {
                          console.log(`created new record for ${ObjectID(req.body.uniqueID)}`);
                          }
                  })
                  if (button_num === "debt")
                    var dashboardState = new debtsAndIncome({
                        uniqueID: req.body.uniqueID,
                        income: "Enter your income",
                        debt: req.body.debt,
                        savings: "Enter your savings"
                    })
                  dashboardState.save(function(err, doc) {
                      if (err) {
                          console.log(err)
                      } else {
                          console.log(`created new record for ${ObjectID(req.body.uniqueID)}`);
                          }
                  })
  }
 }
);
})

router.post("/update/", function(req, res) {
    console.log(req.body);
    const assetData  = new assets(req.body)
    const liabilityData = new liabilities(req.body)
    //search for the doc
    if (req.body.type === "networth") {
    assets.findOne({uniqueID: req.body.uniqueID}, function(err, doc) {
        if (err) {
            console.log(err)
            res.json({message: "Oops! Something went wrong!"})
        }
        //found the doc, now we update it
        if (doc) {
            assets.updateOne({uniqueID: req.body.uniqueID}, {$set: req.body}, function(err, updated) {
                if (err) {
                    console.log(err)
                    res.json({message: "Oops! Something went wrong"})
                } if (updated) {
                    console.log(`Updated record for user with id ${req.body.uniqueID}`)
                    res.json({message: "Updated your assets!"})
                }
            });

            //didnt find the doc, so we make a new one
        } else {
        assetData.save(function(err, doc) {
            if (err) {
                res.json({ message: "Oops! Something went wrong!"});
                console.log(err)
            } if (doc) {
                res.json({message: "Success!"})
                console.log("New info saved for user with id " + req.body.uniqueID)
            }
        })
    }})
}else {
    liabilities.findOne({uniqueID: liabilityData.uniqueID}, function(err, doc) {
        if (err) {
            console.log(err)
            res.json({message: "Oops! Something went wrong!"})
        }
        //found the doc, now we update it
        if (doc) {
            liabilities.updateOne({uniqueID: liabilityData.uniqueID}, {$set: req.body}, function(err, updated) {
                if (err) {
                    console.log(err)
                    res.json({message: "Oops! Something went wrong"})
                } if (updated) {
                    console.log(`Updated record for user with id ${req.body.uniqueID}`)
                    res.json({message: "Updated your liabilities!"})
                }
            });

            //didnt find the doc, so we make a new one
        } else {
            liabilityData.save(function(err, doc) {
            if (err) {
                res.json({ message: "Oops! Something went wrong!"});
                console.log(err)
            } if (doc) {
                res.json({message: "Success!"})
                console.log("New info saved for user with id " + req.body.uniqueID)
            }
        })
    }})

}})  

router.get("/dashboard-display/:user_id", function(req, res) {
    const userID = req.params.user_id
    console.log("new GET request from user with ID " + userID)
    debtsAndIncome.findOne({"uniqueID": userID}, function(err, doc) {
        if (err) console.log(err)
        if(doc) res.json({"message": "record found", "savings": doc.savings, "debt": doc.debt, "income": doc.income });
        else res.json({"message": "User has not entered data"})
    })
}
)

router.get("/asset/total/:user_id", function(req, res) {
    const userID = req.params.user_id
    console.log(userID)
    assets.findOne({uniqueID: userID}, function(err, found) {
        if (err) {
            console.log(err);
            res.json({message: "Oops! Something went wrong."})
        } if (found) {
            console.log("Sending total networth value to user with id " + userID)
            res.json({assetTotal: +found.Real_Estate + +found.checking + +found.asset_savings + +found.retirement + +found.investments + +found.vehicles + +found.other_assets})
        }   
        else {
            res.json({networth: "Enter your assets and liabilities!"})
        }
     })
})

router.get("/liabilities/total/:user_id", function(req, res) {
    const userID = req.params.user_id
    console.log(userID)
    liabilities.findOne({uniqueID: userID}, function(err, found) {
        if (err) {
            console.log(err);
            res.json({message: "Oops! Something went wrong."})
        } if (found) {
            console.log("Sending total networth value to user with id " + userID)
            res.json({liabilityTotal: +found.mortgages + +found.consumer_debt + +found.personal_loans + +found.student_loans + +found.medical_debt + +found.vehicle_loans + +found.other_liabilities})
        }   
        else {
            res.json({networth: "Enter your assetts and liabilities!"})
        }
     })
})


router.get("/:user_id/:type", function(req, res) {
    const data = req.params.type
    const userID = req.params.user_id
    if (data == "assets") {
        assets.findOne({ uniqueID: userID }, function(err, found) {
            if (err) { 
                console.log(err);
                res.json({message: "Error searching database"})
            }
            if (found) {
                res.json(
                    found
                ) 
            }
                        })
                        }
                        if (data == "liabilities") {
                            liabilities.findOne({uniqueID: userID}, function(err, found) {
                                if (err) {
                                    console.log(err)
                                    res.json({message: "error searching database"})
                                }   
                                if (found) {
                                    console.log("success")
                                    res.json(
                                        found
                                    )
                                }
                            })
                        }
                    }
                )



  module.exports = router;