const express = require('express');
const router = express.Router();

// import recipe module
const recipeModule = require('./recipeModule');

// set recipe module functions 
const addNewRecipe = recipeModule.addRecipe;
const deleteRecipe = recipeModule.deleteRecipe;
const displayAllRecipes = recipeModule.displayAllRecipes;
const editRecipe = recipeModule.editRecipe;
const saveRecipe = recipeModule.saveRecipe;
const saveAfterEdit = recipeModule.saveAfterEdit;
const viewRecipe = recipeModule.viewRecipe;

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

module.exports = router;