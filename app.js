var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var index = require('./routes/index');
var coins = require('./routes/coins');
var countries = require('./routes/countries');
var metals = require('./routes/metals');
var roles = require('./routes/roles');
var users = require('./routes/users');
var wears = require('./routes/wears');

var models = require('./models');
var data = require('./data');

/**
* SEQUELIZE SYNCHRONISATION
*/
models.sequelize.sync();

//models.sequelize.sync({ force : true });

//models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(function(results) {
//        models.sequelize.sync({force: true});
//});


/*
* ROUTES CONFIGURATION
*/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/',index);
app.use('/coins',coins);
app.use('/countries',countries);
app.use('/metals',metals);
app.use('/roles',roles);
app.use('/users',users);
app.use('/wears',wears);


app.get('*', function(req, res){
    /**
    *  load the Single View file for AngularJS (angular will handle the page changes on the front-end)
    */
    //res.sendfile('./public/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
