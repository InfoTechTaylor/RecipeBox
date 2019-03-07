const express = require('express');
const router = express.Router();
const auth = require('../user/auth');
const _ = require('underscore');

// import modules
const recipeModule = require('../recipe/recipeModule');
const userModule = require('../user/userModule');

// set recipe module functions 
const addNewRecipe = recipeModule.addRecipe;
const deleteRecipe = recipeModule.deleteRecipe;
const displayAllRecipes = recipeModule.displayAllRecipes;
const editRecipe = recipeModule.editRecipe;
const saveRecipe = recipeModule.saveRecipe;
const saveAfterEdit = recipeModule.saveAfterEdit;
const viewRecipe = recipeModule.viewRecipe;

// set user module functions
const addNewUser = userModule.addNewUser;
const registerUser = userModule.registerUser;
const getLoginPage = userModule.getLoginPage;
const login = userModule.login;
const logout = userModule.logout;

// auth module functions
const requiresLogin = auth.requiresLogin;
const requireRole = auth.requireRole;

// define routes 
router.get('/', requiresLogin, (req, res, next) => {
  res.redirect('/recipes');
});

// HTML ROUTES ****************************************************************************
router.get('/recipes', requiresLogin, displayAllRecipes, (req, res, next) => {
  res.render('recipeList',{ title: "All Recipes", recipes: req.results });
}); 

router.get('/recipes/view/:id', requiresLogin, viewRecipe, (req, res, next) => {
  
  res.render('viewRecipe',
    {
      title: "View Recipe",
      data: {
        id: req.results._id,
        title: req.results.title,
        source: req.results.source,
        description: req.results.description,
        ingredients: req.results.ingredients,
        instructions: req.results.instructions
      }
    });
});

// admin only pages for add, delete, and edit
router.get('/recipes/add', requiresLogin, requireRole('admin'), addNewRecipe); 
router.post('/recipes/add', requiresLogin, requireRole('admin'), saveRecipe); 
router.get('/recipes/delete/:id', requireRole('admin'), requiresLogin, deleteRecipe, (req, res, next) => {
  res.redirect('/recipes');
});
router.get('/recipes/edit/:id', requireRole('admin'), requiresLogin, editRecipe);
router.post('/recipes/edit/:id', requireRole('admin'), requiresLogin, saveAfterEdit);


// user routes
router.get('/user/register', addNewUser);
router.post('/user/register', registerUser);

router.get('/user/login', getLoginPage);
router.post('/user/login', login)

router.get('/user/logout', requiresLogin, logout);

router.get('/user/unauthorized', (req, res, next) => {
  res.render('unauthorized');
});
// END HTML ROUTES ***********************************************************************

// API ROUTES ****************************************************************************
// get all recipes
router.get('/api/v1/recipes', displayAllRecipes, (req, res, next) => {
  
  res.format({
    'application/json': () => {
      res.json(req.results);
    },
    'application/xml': () => {
      let xml = 
        '<?xml version="1.0"?>\n<recipes>\n' +
            req.results.map((recipe) => {
              return '<recipe id ="' + recipe.id + '">' +
                '<title>' + recipe.title + '</title>\n' +
                '<source>' + recipe.source + '</source>\n' +
                '<description>' + recipe.description + '</description>\n' +
                _.each(recipe.ingredients, function(ingredient) {
                  return '<ingredient>' + ingredient + '</ingredient>';
                }).join(
                '<ingredients>' + recipe.ingredients + '</ingredients>\n' +
                '<instructions>' + recipe.instructions + '</instructions>\n' +
                  '</recipe>')
            })
        .join('\n') + '\n</recipes>\n';

      res.type('application/xml');
      res.send(xml);
    }
  });
  
});

// get recipe by id
router.get('/api/v1/recipes/:id', viewRecipe, (req, res, next) => {
  res.format({
    'application/json': () => {
      res.json(req.results);
    },
    'application/xml': () => {

      let xml =
        '<?xml version="1.0"?>\n<recipe id="' + req.results.id + '">\n' +
        '<title>' + req.results.title + '</title>\n' +
        '<source>' + req.results.source + '</source>\n' +
        '<description>' + req.results.description + '</description>\n' +
        '<ingredients>' + req.results.ingredients + '</ingredients>\n' +
        '<instructions>' + req.results.instructions + '</instructions>\n' +
        '</recipe>';
      res.type('application/xml');
      res.send(xml);
    }
  });
}); 

// END API ROUTES ***********************************************************************

module.exports = router;