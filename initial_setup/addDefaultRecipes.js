const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/recipeDB';

const connection = mongoose.createConnection(dbUrl);

const RecipeDb = require('./recipeDb');
const Recipe = RecipeDb.getModel(connection);

// create recipe objects when the database connection is open
// sets up database with initial data to test with
connection.on("open", () => {

  // create and save document objects for the three recipes
  let recipe;

  recipe = new Recipe({
    title: '5-minute Golden Milk',
    source: 'Minimalist Baker',
    description: 'A comforting milk with warming spices',
    ingredients: ['almond milk', 'turmeric'],
    instructions: ['1. heat milk in saucepan', '2. mix in all other ingredients']
  });
  recipe.save();

  recipe = new Recipe({
    title: '5-minute Golden Milk',
    source: 'Minimalist Baker',
    description: 'A comforting milk with warming spices',
    ingredients: ['almond milk', 'turmeric'],
    instructions: ['1. heat milk in saucepan', '2. mix in all other ingredients']
  });
  recipe.save();


  recipe = new Recipe({
    title: '5-minute Golden Milk',
    source: 'Minimalist Baker',
    description: 'A comforting milk with warming spices',
    ingredients: ['almond milk', 'turmeric'],
    instructions: ['1. heat milk in saucepan', '2. mix in all other ingredients']
  });

  //log on success or throw error
  recipe.save((err) => {
    connection.close();
    if (err) throw err;
    console.log("Success!");
  });

});