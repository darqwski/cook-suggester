//@ts-nocheck
const createError = require('http-errors');
const express = require('express');
var http = require('http');
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
app.set('views', path.join(__dirname, '../public'));
app.set('view engine', 'ejs');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser("SecretKey"));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/img')));

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

/**
 * Get port from environment and store in Express.
 */

const port ='3000'
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);