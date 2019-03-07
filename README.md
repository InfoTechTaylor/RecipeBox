# Overview
Recipe box is an application designed for users to be able to view recipes. The admin has the ability to edit, delete, add, and view recipes and the regular user can just view the recipes. 

# Setup
- Start your local instance of Mongo DB. 
- Populate the database with some basic test users and recipes:
  - Run addDefaultRecipes.js and addDefaultUsers.js from the initial_setup folder 
- exectue server.js
- browse to http://localhost:3000


# REST API
The REST API is setup to show all recipes and a recipe by ID. You can run the below curl commands to see these APIs demonstrated. Replace the :id part of the URL
with an ID that can be found in the browser URL when you view an individual recipe:
 - XML
 - - curl -H "Accept:application/xml" http://localhost:3000/api/v1/recipes
 - - curl -H "Accept:application/xml" http://localhost:3000/api/v1/recipes/:id
 - JSON
 - - curl -H "Accept:application/json" http://localhost:3000/api/v1/recipes
 - - curl -H "Accept:application/json" http://localhost:3000/api/v1/recipes/:id

# A Note on UI
The interface for the user still shows the edit, delete and add recipe functions but when clicked will route to an unauthorized page. While ideally I'd want the links hidden if they have the wrong role, this is not a front end course so I made sure it worked based on the server side code. 