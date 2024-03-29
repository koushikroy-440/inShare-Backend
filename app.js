var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
// Cors 
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(',')
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}

app.use(cors(corsOptions))

var indexRouter = require('./routes/index');


var app = express();
//* connect database
const dbService = require('./services/database.service');
dbService();

//* import routes
const filesRouter = require('./routes/files.route');
const showRouter = require('./routes/show.route');
const downloadRouter = require('./routes/download.route');

//* view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//* declare all middleware 
app.use('/', indexRouter);
app.use('/api/files', filesRouter);
app.use('/files', showRouter);
app.use('/files/download', downloadRouter);

//* catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//* error handler
app.use(function (err, req, res, next) {
  //* set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //* render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
