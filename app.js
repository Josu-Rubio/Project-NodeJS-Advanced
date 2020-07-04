const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/api/products');

const app = express();

// Connect to DB
const mongooseConnection = require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Setup de i18n
 */
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);

app.locals.title = 'NodeAPI';

/**
 * Starting the session system
 */
app.use(
  session({
    name: 'NodeAPI',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: false, // We are not using HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 2,
    },
    store: new MongoStore({ mongooseConnection }),
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

const sessionAuth = require('./lib/sessionAuth');
const loginController = require('./routes/loginController');
const personalController = require('./routes/personalController');
const jwtAuth = require('./lib/jwtAuth');

/**
 * API routes
 */

app.use('/api/products', jwtAuth(), productsRouter);
app.use('/api/loginJWT', loginController.postJWT);

/**
 * Web routes
 */
app.use('/products', productsRouter);
app.use('/', indexRouter);
app.use('/change-locale', require('./routes/change-locale'));
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);
app.get('/personal', sessionAuth(['admin']), personalController.index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err.status);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
