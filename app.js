
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var matchup = require('./routes/matchup');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('appName', 'Pooch Madness');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(function(req,res,next) {
  res.locals.session = req.session;
  next();
});

app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/matchup', matchup.view);
app.post('/matchup/winner/:id', matchup.winner);
app.get('/signup', user.signup);
app.post('/signup', user.create);
app.post('/signin', user.signin);
app.get('/signout', user.signout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
