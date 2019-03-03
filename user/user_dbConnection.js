const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userDbUrl = 'mongodb://localhost:27017/userDB';

let userDbConnection = null;
let User = null;

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

userSchema.statics.authenticate = function (username, password, callback) {
  console.log('inside authenticate function');
  User.findOne({ username: username }).exec(function (err, user) {
    console.log('inside find one');
      if (err) {
        console.log('err', err);
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        console.log(err);
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        console.log('bcrypt');
        if (result === true) {
          return callback(null, user);
        } else {
          return callback(err);
        }
      })
    });
};

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

// const User = mongoose.model('User', userSchema);
// module.exports = User;

// create the model for the schema and export
module.exports.getModel =() => {
    if (userDbConnection === null) {
      console.log("Creating user connection and model...");
      userDbConnection = mongoose.createConnection(userDbUrl);
      User = userDbConnection.model("User", userSchema);
      console.log('user connection success!');
    };
    return User;
  };

