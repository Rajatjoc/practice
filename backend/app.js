

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var User = require('./server/models/users')

var logger = require('morgan');
var db = require('./db.js');
var jsonParser = bodyParser.json({limit: 1024 * 1024 * 20, type: 'application/json'});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cmsRouter = require('./routes/cms'); 
var categoryRouter = require('./routes/category');
var session = require('express-session');
var cors = require('cors')

var categoryRouter = require('./routes/category');
var app = express();

/**CORS (Allowing cross origin request) setup */
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



/** Creating user session */

app.use(session({
  secret: 'cruel_diaries',
  cookie: {maxAge: 43200000},
  resave: true,
  saveUninitialized: true,
  rolling: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log(user,"Session started")
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
})

var LocalStrategy = require('passport-local').Strategy;

passport.use('local-login',
  new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      User.findOne({ 'email' :  email }, function(err, user) {
        if (err) return done(err);
        if (!user){
            req.flash("email", req.body.email);
            return done(null, false, req.flash('loginError', 'No user found.'));
        }
        if (!user.authenticate(password)){
            req.flash("email", req.body.email);
            return done(null, false, req.flash('loginError', 'Password does not Match.'));
        }
        var email_address = req.body.email;
        username_tmp = email_address;
        var username = email_address.substring(0, email_address.lastIndexOf("@"));
        global_username = username;
        pass = req.body.password;
        return done(null, user);
      });
    }
  )
);



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: 1024 * 1024 * 20, type: 'application/json'}));
app.use(jsonParser);
app.use(bodyParser.urlencoded({extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding'}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexSSRouter);
app.use('/users',usersRouter);
app.use('/cms',cmsRouter)
app.use('/category',categoryRouter);
// catch 404 and forward to error handler

// publicDir = process.argv[2] || __dirname + '/public/dist',
publicDir = __dirname + '/public/dist',
// console.log(publicDir,"<<<-----------------<<<<<")
app.use(express.static(publicDir));
app.use(express.static(path.join(__dirname, 'public/')));
app.get('/', function (req, res) {

  res.sendFile(path.join( "/index.html",{ root: publicDir }));
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(publicDir, "/index.html"));
});


app.use(function(req, res, next) {
  next(createError(404));
});

// publicDir = process.argv[2] || __dirname + '/public/dist',

// app.use(express.static(publicDir));
// app.use(express.static(path.join(__dirname, 'public/')));
// app.get('/', function (req, res) {

//   res.sendFile(path.join(publicDir, "/index.html"));
// });
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(publicDir, "/index.html"));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Route Path
// require('./routes/products')(app, express, passport);

module.exports = app;