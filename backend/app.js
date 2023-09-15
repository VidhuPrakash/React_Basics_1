var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const saveUser = require('./config/admin_login_data');
// var bcrypt = require('bcrypt');
// var User = require("./Model/adminSchema");
// var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var indexRouter = require('./routes/index');
var userAPI = require('./routes/admin')
// var usersRouter = require('./routes/users');
mongoose.connect('mongodb://127.0.0.1:27017/TaskSample2'); 

 cors = require("cors");


//  add admin password and name 
//  saveUser('admin', 'admin');


 app.use(cors());
 // app.listen(port, () => console.log("Backend server live on " + port));
 
 app.use(logger('dev'));
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 app.use(cookieParser());
 app.use(express.static(path.join(__dirname, 'public')));
 
 app.use('/', indexRouter);
 app.use('/admin',userAPI);
//  app.get('*', function(req, res) {
//     res.sendFile('index.html', {root: path.join(__dirname, '../../client/build/')});
//   });
 
 module.exports = app;
 
 // app.use('/users', usersRouter);
 // port = process.env.PORT || 3000,