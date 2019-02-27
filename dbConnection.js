const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/recipeDB';

let connection = null;
let model = null;

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

console.log('schema created');

// create the model for the schema and export
module.exports.getModel = 
() => {
  console.log('get model');
  if (connection === null) {
    console.log("Creating connection and model...");
    connection = mongoose.createConnection(dbUrl);
    model = connection.model("RecipeModel", recipeSchema);
    console.log('connection success!');
  };
  return model;
};

