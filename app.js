const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const errorHandler = require('errorhandler');
const logging = require('./routes/logging');
const calculating = require('./routes/calculating');

const app = express();
const port = process.env.PORT || 3000;
const sessionSecret = process.env.SESSION_SECRET || 'local-development-secret';

app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride());
app.use(cookieParser(sessionSecret));
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/logging', logging.logging);
app.get('/logging:days', logging.logging);
app.post('/', logging.save);
app.get('/calculating', calculating.showresult);

if (app.get('env') === 'development') {
  app.use(errorHandler());
}

const startServer = async () => {
  await mongoose.connect('mongodb://localhost/logging');

  return app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Failed to start the application:', error);
    process.exitCode = 1;
  });
}

module.exports = {app, startServer};
