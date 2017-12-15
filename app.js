var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var fileUpload = require('express-fileupload');
var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var games = require('./routes/games');
var messages = require('./routes/messages');
var projects = require('./routes/projects');
var upgrade = require('./routes/upgrade');
var search = require('./routes/search');
var settings = require('./routes/settings');
var timeline = require('./routes/timeline');
var travels = require('./routes/travels');
var analytics = require('./routes/analytics');
var lastpath = '';
var config = require('./config')

var Time = require('./models/time')
var time;
var app = express();


mongoose.connect(config.mongo);
// view engine setup
app.use(session({secret: 'da5wUdPyw2S5', resave: false,saveUninitialized: true,cookie: { secure: false }}))
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(fileUpload());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/', function(req, res, next) {
  // body...
  var sess = req.session;
  console.log(sess.email);
  console.log("dddddd", req.path)

  if(sess.email && req.path == '/'){
    res.redirect('/index');
  }

  if(req.path.indexOf('auth') > -1 || req.path.indexOf('ajax') > -1) {
    console.log("auth")
    next();
  } else if(sess.email){
    // res.render('index')
    if(req.path.split('/')[1] == 'index'){
      if(time == ''){
        time.end = new Date();
        time.session = Math.abs(new Date(time.start).getTime() - time.end.getTime());
        time.save(function(err, t){
          console.log('success');
          lastpath = '';
          next();
        })
      }else{
        next();
      }      
    }else if(lastpath == ''){
      lastpath = req.path.split('/')[1]
      time = new Time({
        page: lastpath,
        user_id: sess.user._id,
        start: new Date(),
        end: '',
        session: 0
      });
      time.save(function(err, t){
        time = t;
        next();    
      })
    } else{
      lastpath = req.path.split('/')[1]
      if(lastpath == time.page){
        next()
      }else{
        time.end = new Date();
        time.session = Math.abs(new Date(time.start).getTime() - time.end.getTime());
        time.save(function(err, t){
          lastpath = req.path.split('/')[1]
          time = new Time({
            page: lastpath,
            user_id: sess.user._id,
            start: new Date(),
            end: '',
            session: 0
          });
          time.save(function(err, t){
            time = t;
            next();    
          })
        });
      }      
    }    
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
app.use('/travels', travels);
app.use('/upgrade', upgrade);
app.use('/community', analytics);


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
  console.log("========================== error ==================================")
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.render('pages-error-404-2');
});

module.exports = app;
