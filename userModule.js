const DB = require('./user_dbConnection.js');
const User = DB.getModel();

module.exports.addNewUser = (req, res, next) => {
  res.render('newUser', {title: 'Add New User'});
};

module.exports.registerUser = (req, res, next) => {
    if (req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.passwordConf) {
        if(req.body.password === req.body.passwordConf){
          var userData = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
          });

          //use schema.create to insert data into the db
          userData.save((err) => {
            if (err) {
              console.log("Error: ", err);
            } else {
              res.redirect('/recipes');
            }
          });
        } else {
          res.render('newUser', {title: 'Add New User'});
        }
      
      
    }
};