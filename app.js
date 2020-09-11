global.__basedir = __dirname

var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var middlewaredirectory = require('./src/middlewaredirectory')

const fileUpload = require('express-fileupload')
const cors = require('cors');



var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var filesRouter = require('./routes/files')
var taskRouter = require('./routes/task')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');


app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : path.join(__dirname, 'tmp'),
  limits: { fileSize: 5000 * 1024 * 1024 },
  debug: false
}))

app.use(middlewaredirectory)
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
//app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/files', filesRouter)
app.use('/task', taskRouter)


app.use('/favicon.ico', function(req, res, next) {
  res.render('index', { title: 'Express' })
})


app.use(express.static(path.join(__dirname,"./public/dist/"))); 
app.use('/', function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, './public/dist/') })
})


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
