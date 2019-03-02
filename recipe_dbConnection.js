const mongoose = require('mongoose');

const recipeDbUrl = 'mongodb://localhost:27017/recipeDB';

let recipeDbConnection = null;
let recipeModel = null;

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

console.log('recipe schema created');

// create the model for the schema and export
module.exports.getModel = 
() => {
  if (recipeDbConnection === null) {
    console.log("Creating recipe connection and model...");
    recipeDbConnection = mongoose.createConnection(recipeDbUrl);
    recipeModel = recipeDbConnection.model("RecipeModel", recipeSchema);
    console.log('recipe connection success!');
  };
  return recipeModel;
};

