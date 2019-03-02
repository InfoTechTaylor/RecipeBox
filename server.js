const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const session = require('express-session');

const app = express();

// setup handlebars view engine
app.engine('handlebars',
  handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

// static resources
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// server routing
const routes = require('./index');
app.use('/', routes);

app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});