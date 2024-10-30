/**
 * Module dependencies.
 */

var express = require('express');
var logging = require('./routes/logging');
var calculating = require('./routes/calculating');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
// const favicon = require('serve-favicon');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const errorHandler = require('errorhandler');

var app = express();

// set mongodb connection
mongoose.connect('mongodb://localhost/logging');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(favicon());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser('your secret here'));
app.use(session());
// app.use(app.router);
// app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.get('/logging', logging.logging);
app.get('/logging:days', logging.logging);
app.post('/', logging.save);
app.get('/calculating', calculating.showresult);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
