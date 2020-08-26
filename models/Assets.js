const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const assetsSchema = new Schema({
  uniqueID: {
    type: String,
    required: true
  },
  Real_Estate: {
    type: String,
    required: false
  },
  checking: {
    type: String,
    required: false
  },
  asset_savings: {
    type: String,
    required: false
  },

  retirement: {
      type: String,
      required: false
  },

  investments: {
      type: String,
      required: false
  },

  vehicles: {
      type: String, 
      required: false
  },

  other_assets: {
      type: String,
      required: false
  }

});



module.exports = assets = mongoose.model("assets", assetsSchema);