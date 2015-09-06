var path = require('path');
var env = require('node-env-file');
var express = require('express');
var morgan = require('morgan');
var parser = require('body-parser');
var cors = require('cors');

// Load environment vars
env(__dirname + '/.env');

var app = express();

app.set('json spaces', 2);
app.set('view engine', 'jade');
app.use(cors());
app.use(morgan('combined'))
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// Setup routes
app.use('/v1', require('./routes/api'));
app.use('/v1/vendor', require('./routes/vendor'));

/// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Add development error handler that will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Add production error handler with no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Start the server
var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port ' + server.address().port);
});
