var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var games = require('./routes/games');
var messages = require('./routes/messages');
var projects = require('./routes/projects');
var search = require('./routes/search');
var settings = require('./routes/settings');
var timeline = require('./routes/timeline');

var config = require('./config')

var app = express();


mongoose.connect(config.mongo);
// view engine setup
app.use(session({secret: 'da5wUdPyw2S5', resave: false,saveUninitialized: true,cookie: { secure: false }}))
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', function(req, res, next) {
  // body...
  var sess = req.session;
  console.log(sess.email);

  if(req.path.indexOf('auth') > -1) {
    console.log("auth")
    next();
  } else if(sess.email){
    // res.render('index')
    next();
  } else {
    res.redirect('/auth/login')
  }
});

app.use('/index', index);
app.use('/users', users);
app.use('/auth', auth);
app.use('/games', games);
app.use('/messages', messages);
app.use('/projects', projects);
app.use('/search', search);
app.use('/settings', settings);
app.use('/timeline', timeline);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  // res.render('pages-error-404-2');
  next(err);
});

app.use(function(req, res, next) {
	// body...
	var sess = req.session;
  console.log("============================================================")
  console.log(sess)
  console.log(sess.email)
  console.log("=================================================================")
	if(sess.email){
		res.redirect('/index')
	} else {
		res.redirect('/auth/login')
	}
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err.message)
  // render the error page
  res.status(err.status || 500);
  res.render('pages-error-404-2');
});

module.exports = app;
