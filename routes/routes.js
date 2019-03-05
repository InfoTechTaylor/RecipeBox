const express = require('express');
const router = express.Router();
const rest = require('connect-rest');
const auth = require('../user/auth');

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

// set recipe api functions
const apiDisplayAllRecipes = recipeModule.apiDisplayAllRecipes;

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

router.get('/recipes', requiresLogin, displayAllRecipes); 

router.get('/recipes/view/:id', requiresLogin, viewRecipe);

router.get('/recipes/add', requiresLogin, requireRole('admin'), addNewRecipe); 
router.post('/recipes/add', requiresLogin, requireRole('admin'), saveRecipe); 

router.get('/recipes/delete/:id', requireRole('admin'), requiresLogin, deleteRecipe);

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



module.exports = router;