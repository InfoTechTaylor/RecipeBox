const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/userDB';

const connection = mongoose.createConnection(dbUrl);

const UserDb = require('./userDb');
const User = UserDb.getModel(connection);

// create user objects when the database connection is open
// sets up database with initial data to test with
connection.on("open", () => {

  // create and save document objects
  let user;

  user = new User({
    email: 'admin@recipebox.com',
    username: 'admin',
    password: 'admin',
    role: 'admin'
  });
  user.save();

  user = new User({
    email: 'user@recipebox.com',
    username: 'user',
    password: 'user',
    role: 'user'
  });

  //log on success or throw error
  user.save((err) => {
    connection.close();
    if (err) throw err;
    console.log("Success!");
  });

});