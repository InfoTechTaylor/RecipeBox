const express = require('express');
const router = express.Router();

// import modules
const recipeModule = require('./recipeModule');
const userModule = require('./userModule');

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

// define routes 
router.get('/', (req, res, next) => {
  res.redirect('/recipes');
});

router.get('/recipes', displayAllRecipes); 

router.get('/recipes/view/:id', viewRecipe);

router.get('/recipes/add', addNewRecipe); 
router.post('/recipes/add', saveRecipe); 

router.get('/recipes/delete/:id', deleteRecipe);

router.get('/recipes/edit/:id', editRecipe);
router.post('/recipes/edit/:id', saveAfterEdit);


// user routes
router.get('/user/register', addNewUser);
router.post('/user/register', registerUser);

router.get('/user/login', getLoginPage);
router.post('/user/login', login)

module.exports = router;