'use strict'

const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require('mongoose');
const User = require('./models/user.js');
const Activity = require('./models/activity.js');
const Statistic = require('./models/statistic.js');
const apiRouter = require('./apiRouter.js');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
mongoose.Promise = require('bluebird');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());

app.use(session({
  // genid: function(req),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname));
app.use('/static', express.static('static'));
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use('/api/', apiRouter)

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user){
      if (user && password === user.password){
        return done(null, user);
      }
      return done(null, false);
    });
  }
));

mongoose.connect('mongodb://localhost:27017/week7db');

app.get('/', function(req, res){
  res.send("main page")
})

app.listen(3000, function(){
  console.log("Successfully started express application!");
})
