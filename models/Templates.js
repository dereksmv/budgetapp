const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const templateSchema = new Schema({
  uniqueID: {
    type: String,
    required: true
  },

  template_name: {
      type: String,
      required: true
  },

  categories: {
      type: [{
        category: String,
        categoryBudgetItems: [String]
      }],
      required: true
  }

});



module.exports = templates = mongoose.model("templates", templateSchema);