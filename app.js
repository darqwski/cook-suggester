const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')

const landingPageRouter = require('./routes/pages/landing-page');
const moderatorAddRecipes = require('./routes/pages/moderator/add-recipe');
const apiIngredients = require('./routes/api/ingredients');
const apiSuggestions = require('./routes/api/suggestions');
const apiRecipes = require('./routes/api/recipes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser("SecretKey"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/img')));

app.use('/', landingPageRouter);
app.use('/', landingPageRouter);

app.use('/', apiIngredients);
app.use('/', moderatorAddRecipes);
app.use('/', apiSuggestions);
app.use('/', apiRecipes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req.path)
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
  res.render('error');
});

module.exports = app;
