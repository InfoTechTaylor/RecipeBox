const os = require('os');
const DB = require('./recipe_dbConnection.js');
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
      
      req.results = results;
      return next();
    });
  };

module.exports.viewRecipe = (req, res, next) => {
  let id = req.params.id;

  Recipe.findById(id, (err, recipe) => {
    if (err) {
      console.log('Error selecting : %s ', err);
    }

    let data;
    if (!recipe) {
      data = { error: '404' };
    } else {
      data = {
        id: recipe._id,
        title: recipe.title,
        source: recipe.source,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions
      }
    }

    req.results = data;
    return next();

  });
};

module.exports.addRecipe = (req, res, next) => {
    res.render('newRecipe', { title: "Add a Recipe" });
};

module.exports.saveRecipe = (req, res, next) => {

  // TODO filter out empty lines for ingredients and instructions
  // TODO remove numbers at start of ingredient lines if users added them
  // TODO validate required fields are not empty first before saving
  let recipe = new Recipe({ 
    title: req.body.title,
    source: req.body.source,
    description: req.body.description,
    ingredients: req.body.ingredients.split(os.EOL),
    instructions: req.body.instructions.split(os.EOL)
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

    // TODO filter out empty lines for ingredients and instructions
    // TODO remove numbers at start of ingredient lines if users added them
    // TODO validate required fields are not empty first before saving
    recipe.title = req.body.title;
    recipe.source = req.body.source;
    recipe.description = req.body.description;
    recipe.ingredients = req.body.ingredients.split(os.EOL);
    recipe.instructions = req.body.instructions.split(os.EOL);

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
      
      return next();
    });
  });
};