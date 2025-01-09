var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
<<<<<<< HEAD
var cors = require("cors");

=======
var cors = require('cors')
>>>>>>> b6e23fea3c87bf0a5b9367d137c78259e4d248ed
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var seatRouter = require('./routes/seats')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var app = express();


app.use(cors());

// Connect to MongoDB (replace with your own connection string)
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/readingSpacedb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/seats',seatRouter)

const JWT_SECRET = '123456789ABCDEF'; // Use a secure secret key in production


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
  res.render('error');
});

module.exports = app;
