const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const rest = require('connect-rest');

const app = express();

// setup handlebars view engine
app.engine('handlebars',
  handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// connect for auth
mongoose.connect('mongodb://localhost:27017/userDB');
const db = mongoose.connection;

// use sessions for tracking logins
// TODO what should secret value be? 
// TODO cookie secure flag should be set
app.use(session({
  secret: 'SECRET',
  resave: true,
  saveUninitialized: false,
  store: new mongoStore({
    mongooseConnection: db
  })
}));

// static resources
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// REST API ROUTES
// const apiOptions = {
//   context: '/api',
//   domain: require('domain').create()
// };

// // link API into pipeline
// app.use(rest.rester(apiOptions));

// server routing
const routes = require('./routes/routes');
app.use('/', routes);

app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});