var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var seatRouter = require('./routes/seats')
var loginRouter = require('./routes/login')
var tierRouter = require('./routes/tier')
var paymentRouter = require('./routes/payment')
var blogRouter = require('./routes/blog')
var notificationRouter= require('./routes/notification')
var vacationRouter=require('./routes/vacation')
var issueRouter  =require('./routes/issue')
var app = express();
const backgroundTasks = require('./background/backgroundTasks');

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
app.use('/login',loginRouter)
app.use('/tier',tierRouter)
app.use('/payment',paymentRouter)
app.use('/blog',blogRouter)
app.use('/notification',notificationRouter)
app.use('/vacation',vacationRouter)
app.use('/issue',issueRouter)


// Serve static files (images, etc.) from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Serve files relative to the project root



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
