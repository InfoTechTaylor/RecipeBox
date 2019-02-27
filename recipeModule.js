const DB = require('./dbConnection.js');
const Recipe = DB.getModel();


module.exports.displayAllRecipes =
  (req, res, next) => {
    Recipe.find({}, (err, recipes) => {
      if (err) {
        console.log('Error:', err);
      }

      let results = recipes.map((recipe) => {

        return {
          id: recipe._id,
          title: recipe.title,
          source: recipe.source,
          description: recipe.description,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions
        }
      });

      res.render('recipeList',
        { title: "All Recipes", recipes: results });
    });
  };


module.exports.addRecipe = (req, res, next) => {
  res.render('newRecipe', { title: "Add a Recipe" });
};

module.exports.saveRecipe = (req, res, next) => {
  let recipe = new Recipe({
    title: req.body.title,
    source: req.body.source,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions
  });

  recipe.save((err) => {
    if (err) {
      console.log("Error: ", err);
    }
    res.redirect('/recipes');
  });
};

module.exports.editRecipe = (req, res, next) => {
  let id = req.params.id;

  Recipe.findById(id, (err, recipe) => {
    if (err) {
      console.log('Error selecting : %s ', err);
    }

    if (!recipe) {
      return res.render('404');
    }

    res.render('editRecipe',
      {
        title: "Edit Recipe",
        data: {
          id: recipe._id,
          title: recipe.title,
          source: recipe.source,
          description: recipe.description,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions
        }
      });
  });
};

module.exports.saveAfterEdit = (req, res, next) => {
  let id = req.params.id;

  Recipe.findById(id, (err, recipe) => {
    if (err) {
      console.log('Error selecting : %s ', err);
    }

    if (!recipe) {
      return res.render('404');
    }

    recipe.title = req.body.title;
    recipe.description = req.body.description;
    recipe.ingredients = req.body.ingredients;
    recipe.instructions = req.body.instructions

    recipe.save((err) => {
      if (err) {
        console.log('Error updating : %s ', err);
      }
      res.redirect('/recipes');
    });
  });
};

module.exports.deleteRecipe = (req, res, next) => {
  let id = req.params.id;

  Recipe.findById(id, (err, recipe) => {
    if (err) {
      console.log('Error selecting : %s ', err);
    }
    if (!recipe) {
      return res.render('404');
    }

    recipe.remove((err) => {
      if (err) {
        console.log('Error deleting : %s ', err);
      }
      res.redirect('/recipes');
    });
  });
};