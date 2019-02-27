const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

// create recipe schema
const recipeSchema = new Schema({
  title: String,
  source: String,
  description: String,
  ingredients: [String],
  instructions: [String]
});

// create the model for the schema and export
module.exports = {
  getModel: (connection) => {
    return connection.model("RecipeModel",
     recipeSchema);
  }
}