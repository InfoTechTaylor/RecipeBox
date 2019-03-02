const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userDbUrl = 'mongodb://localhost:27017/userDB';

let userDbConnection = null;
let userModel = null;

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

// create user schema
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

console.log('user schema created');

// hashing a password before saving it to the database
userSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

const User = mongoose.model('User', userSchema);
module.exports = User;

// create the model for the schema and export
module.exports.getModel =
  () => {
    if (userDbConnection === null) {
      console.log("Creating user connection and model...");
      userDbConnection = mongoose.createConnection(userDbUrl);
      userModel = userDbConnection.model("UserModel", userSchema);
      console.log('user connection success!');
    };
    return userModel;
  };

