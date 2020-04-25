var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var webpackAssets = require('express-webpack-assets');
var frenchRouter = require('./routes/route.fr');
var englishRouter = require('./routes/route.en');
var ExpressTranslate = require('express-translate');
var frenchTranslation = require('./translations/fr');
var englishTranslation = require('./translations/en');

var app = express();

// webpack assets
app.use(webpackAssets('./webpack-assets.json', {devMode: ('development' === process.env.NODE_ENV)}));

// translation
var expressTranslate = new ExpressTranslate({
  escapeHtml: false
});
expressTranslate.addLanguage('fr', frenchTranslation);
expressTranslate.addLanguage('en', englishTranslation);
var setLocale = (locale) => {return (req, res, next) => {
  req.locale = locale;
  res.locals.locale = locale;
  next();
}};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes setup
app.use('/fr', [setLocale('fr'), expressTranslate.middleware(), frenchRouter]);
app.use('/', [setLocale('en'), expressTranslate.middleware(), englishRouter]);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('index', {
    title: res.statusCode + ' - Pask Pool - Cardano Staking Pool',
    locale: 'en',
    status: res.statusCode
  });
});

module.exports = app;
