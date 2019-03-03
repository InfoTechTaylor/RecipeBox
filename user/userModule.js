const DB = require('./user_dbConnection.js');
const User = DB.getModel();

module.exports.addNewUser = (req, res, next) => {
  res.render('newUser', {title: 'Add New User'});
};

module.exports.registerUser = (req, res, next) => {

  // TODO validate valid email is used
  // TODO validate for security concerns 
  // TODO enforce password complexity requirements 
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

module.exports.getLoginPage = (req, res, next) => {
  res.render('login', { title: 'Login' });
};

module.exports.login = (req, res, next) => {
  // TODO remove the below console.log
  // TODO how to hash on submit? 
  console.log('login user', req.body);
  //authenticate input against database
  let username = req.body.username;
  let password = req.body.password;

  User.authenticate(username, password, (err, user) => {
    console.log('authenticate user');
    if(err || !user) {
      var err = new Error('Wrong email or password');
      err.status = 401;
      console.log(err);
      return next(err);
    } else {
      console.log('success');
      req.session.userId = user._id;
      req.session.username = user.username;
      res.redirect('/');
    }
  });
};

module.exports.logout = (req, res, next) => {
  if (req.session) {
    // delete session object from database
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        console.log('successful logout');
        // clear cookie from browser
        res.clearCookie('connect.sid', {path: '/'});
        res.redirect('/');
      }
    });
  }
};
