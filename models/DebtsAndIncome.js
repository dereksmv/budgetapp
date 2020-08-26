const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const debtsAndIncomeSchema = new Schema({
  uniqueID: {
    type: String,
    required: true
  },
  income: {
    type: String,
    required: false
  },
  debt: {
    type: String,
    required: false
  },
  savings: {
    type: String,
    required: false
  }
});
module.exports = debtsAndIncome = mongoose.model("debtsAndIncome", debtsAndIncomeSchema);