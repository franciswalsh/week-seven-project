const express = require('express');
const apiRouter = express.Router();
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const Activity = require('./models/activity.js');
const Statistic = require('./models/statistic.js');
const User = require('./models/user.js');

apiRouter.get('/', function(req, res){
  res.send("this is the api router")
});

apiRouter.get('/activities', passport.authenticate('basic', {session: false}), function(req, res){
  activity.find({}).then(function(activity){
    res.json(activity);
  })
});

apiRouter.post('/activities', passport.authenticate('basic', {session: false}), function(req, res){
  /* this would likely be req.body.title to take in user input*/
  let title = "another new activity"
  /* temp userId. This userId will actually be stored in some sort of authentication*/
  let userId = "59678a1e9d46932134bb76ef"
  var newActivity = new Activity({
    title: title,
    userId: userId
  });
  newActivity.save().then(function(newActivity){
    console.log(newActivity);
    res.json(newActivity)
  }).catch(function(error){
    console.log((error));
  })
});

apiRouter.get('/activities/:id', passport.authenticate('basic', {session: false}), function(req, res){
  /* temp userId. This userId will actually be stored in some sort of authentication*/
  let userId = "59678a1e9d46932134bb76ef";
  let activityId = req.params.id;
  Statistic.find({
    userId: userId,
    activityId: activityId
  }).then(function(statistics){
    res.json(statistics);
  }).catch(function(error){
    console.log(error);
  })
});

apiRouter.put('/activities/:id', passport.authenticate('basic', {session: false}), function(req, res){
  /* temp userId. This userId will actually be stored in some sort of authentication*/
  let userId = "59678a1e9d46932134bb76ef";
  let activityId = req.params.id;
  /* temp activity type. The user will input for theirself likely through req.body.newActivityTitle*/
  let newActivityTitle = "activity name change";
  Activity.updateOne(
    {
      _id: activityId
    },
    {
      $set: {
        title: newActivityTitle
      }
    }
  ).catch(function(errors,affected,resp){
    console.log(errors);
  })
  res.send("check database for success")
});

apiRouter.delete('/activities/:id', passport.authenticate('basic', {session: false}), function(req, res){
  /* temp userId. This userId will actually be stored in some sort of authentication*/
  let userId = "59678a1e9d46932134bb76ef";
  let activityId = req.params.id;
  Activity.deleteOne({
    _id: activityId
  }).then(function(){
    console.log("check database");
  }).catch(function(error){
    console.log(error);
  });
  Statistic.deleteMany({
      activityId: activityId
    }).then(function(){
      console.log("check database again");
    }).catch(function(error){
      console.log(error);
    });
    res.send('check database')
});

apiRouter.post('/activities/:id/stats', passport.authenticate('basic', {session: false}), function(req, res){
  /* temp userId. This userId will actually be stored in some sort of authentication*/
  let userId = "59678a1e9d46932134bb76ef";
  let activityId = req.params.id;
  /*temp date. This will be added in by the user with something like req.body.date*/
  let date = "july 25";
  /*temp reps. This will be added in by the user with something like req.body.reps*/
  let reps = 27;

  var statistic = new Statistic({
    date: date,
    reps: reps,
    activityId: activityId,
    userId: userId
  });

  statistic.save().then(function(statistic){
    console.log(statistic);
  }).catch(function(error){
    console.log(error);
  })
  res.send('check the database');
});

apiRouter.delete('/stats/:id', passport.authenticate('basic', {session: false}), function(req, res){
  /* temp userId. This userId will actually be stored in some sort of authentication*/
  let userId = "59678a1e9d46932134bb76ef";
  let statisticId = req.params.id;

  Statistic.deleteOne({
    _id: statisticId
  }).then(function(){
    console.log("check database");
  }).catch(function(error){
    console.log(error);
  });
  res.send('check database');
})
module.exports = apiRouter
