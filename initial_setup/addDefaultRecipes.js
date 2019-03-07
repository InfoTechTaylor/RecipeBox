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
    title: 'VEGAN PALAK PANEER WITH CURRIED TOFU',
    source: 'Minimalist Baker',
    description: 'An incredibly flavorful, vegan take on classic palak paneer with curried tofu in place of cheese! 30 minutes required, big flavor, and so delicious!',
    ingredients: ['1 15-ounce block firm tofu (drained, patted dry, and cubed)', '1 ½ tsp curry powder (or store-bought)', '1 Tbsp coconut aminos', '1/4 tsp sea salt',
      '2 tsp nutritional yeast (adds a slightly cheesy flavor)', '5 cups loosely packed fresh spinach (organic when possible // 5 cups equals ~6 ounces)'],
    instructions: ['This recipe is all about multi-tasking and is totally doable in 30 minutes. Start by preheating the oven to 425 degrees F (218 C) and draining your tofu. Then wrap in a clean towel and set something heavy on top. (This step can also be done in advance with a tofu press.)', 
    'Cube tofu and add to a medium mixing bowl. Season with curry powder, coconut aminos, sea salt, and nutritional yeast. Shake the bowl to gently toss. Set aside.']
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