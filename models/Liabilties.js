const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const liabilitySchema = new Schema({
  uniqueID: {
    type: String,
    required: true
  },
  consumer_debt: {
    type: String,
    required: false
  },
  personal_loans: {
    type: String,
    required: false
  },
  student_loans: {
    type: String,
    required: false
  },

  medical_debt: {
      type: String,
      required: false
  },

  vehicle_loans: {
      type: String,
      required: false
  },

  mortgages: {
      type: String, 
      required: false
  },

  other_liabilities: {
      type: String,
      required: false
  }

});



module.exports = liabilities = mongoose.model("liabilities", liabilitySchema);