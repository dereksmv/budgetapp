const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const budgetSchema = new Schema({
  uniqueID: {
    type: String,
    required: true
  },

  date: {
      type: String,
      required: true
  },

 budget: {
   type: [
     {
       category: String,
       budgetItems: {type: {budgetItem: String, value: String}}
     }
   ], 

 
   required: true
 },

 budgetName: {
  type: String,
  required: true
 }

});



module.exports = templates = mongoose.model("budget", budgetSchema);