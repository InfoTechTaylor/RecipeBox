# Overview
Recipe Box is an application designed for users to be able to view recipes written with NodeJS and MongoDB. 
The admin has the ability to edit, delete, add, and view recipes. 
A regular user can just view  

## Run Locally
- Start your local instance of Mongo DB. 
- Populate the database with some basic test users and recipes:
  - Run 'node addDefaultRecipes.js' from the initial_setup folder 
  - Run 'node addDefaultUsers.js' from the initial_setup folder
    - this will give you an admin and regular user to login with (setup with basic/bad passwords for simplicity):
      - admin: username=admin, password=admin
      - user: username=user, password=user 
- exectue server.js
- browse to http://localhost:3000

## Functionality
The Recipe Box app supports html and a basic REST API.

### Web App Functionality

#### Login
On first visit to http://localhost:3000, you will be redirected to localhost:3000/user/login to login. Only this page and http://localhost:3000/user/register are 
accessible without logging in. http://localhost:3000/user/register will allow you to create a new user in the mongo database mongodb://localhost:27017/userDB,
which stores an encrypted password using bcrypt. You can create a new user or use the admin or user accounts listed above after doing the initial setup. When
you login you will see a cookie has been created and can see the session in the sessions collection in the userDB.  

#### Admin
The admin user will be able to successfully add, edit and update recipes after logging in while the regular user will get routed to an unauthorized page if they try to click these options. 

#### Logout
The UI does not have a logout link but a user can be logged out by browsing to http://localhost:3000/user/logout. When you do this, you will see that the session gets removed from the userDB sessions collection.
And the cookie will be removed from the browser. 

### REST API Functionality
The REST API is setup to show all recipes and a recipe by ID. You can run the below curl commands to see these APIs demonstrated. Replace the :id part of the URL
with an ID that can be found in the browser URL when you view an individual recipe:
 - XML
   - curl -H "Accept:application/xml" http://localhost:3000/api/v1/recipes
   - curl -H "Accept:application/xml" http://localhost:3000/api/v1/recipes/:id
 - JSON
   - curl -H "Accept:application/json" http://localhost:3000/api/v1/recipes
   - curl -H "Accept:application/json" http://localhost:3000/api/v1/recipes/:id

## A Note on UI
The interface for the user still shows the edit, delete and add recipe functions but when clicked will route to an unauthorized page. While ideally I'd want the links hidden if they have the wrong role, this is not a front end course so I made sure it worked based on the server side code. 