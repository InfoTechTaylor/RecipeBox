module.exports.requiresLogin = (req, res, next) => {
  if (req.session && req.session.userId) {
    console.log('user is logged in');
    return next();
  } else {
    console.log('user must be logged in... redirecting to login page');
    res.redirect('/user/login');
  }
}

module.exports.requireRole = (role) => {
  return function (req, res, next) {
    if (req.session && req.session.role === role) {
      next();
    } else {
      res.redirect('/user/unauthorized');
    }
  }
}
