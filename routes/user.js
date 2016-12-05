var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/models.js').User;

passport.use(new FacebookStrategy({
    clientID: 1036813176414179,
    clientSecret: 'f4ff44c9a8187cfbcb76c853739f31e5',
    callbackURL: "http://recipevil.westus2.cloudapp.azure.com:3000/#/tabs/login/auth/facebook/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    console.log(done);
    User.findOne(
      {email: req.body.email}, function (err, user) {
        if (err) {
          return done(err)
        }
      else {
          done(null, user);
        }
      });
  }
));

router.post(
  '/create', function (req, res, next) {
    User.findOne(
      {email: req.body.email}, function (err, user) {
        if (err) {
          res.status(400).send({error: err});
        }
        else if (user !== null) {
          res.status(400).send({error: 'This user already exists'});
        }
        else {
          User.create(
            req.body, function (theerr, theuser) {
              if (theerr) {
                res.status(400).send({error: theerr});
              }
              else {
                res.json(theuser);
              }
            }
          )
        }
      }
    )
  }
);


router.post(
  '/login', function (req, res, next) {
    User.findOne(
      {email: req.body.email}, function (err, user) {
        if (err) {
          res.status(400).send({error: err});
        }
        else if (user === null) {
          res.status(400).send({error: 'This user does not exist'});
        }
        else if (user && user.password !== req.body.password) {
          res.status(400).send({error: 'password is incorrect try again'});
        }
        else if (user && user.password === req.body.password) {
          res.json(user);
        }
      }
    )
  }
);

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('auth/facebook/callback',
  passport.authenticate('facebook',{successRedirect: '/home', failureRedirect: '/login'}));

router.post(
  '/logout', function (req, res, next) {

  }
);

router.get(
  '/read/:userId', function (req, res, next) {
    User.findById(
      req.params.userId, function (err, user) {
        if (err) {
          res.status(400).send({error: err});
        }
        else if (user === null) {
          res.status(400).send({error: 'This user does not exist'});
        }
        else {
          res.json(user);
        }
      }
    )
  }
);

router.post(
  '/update', function (req, res, next) {
    User.findById(
      req.body._id, function (err, user) {
        if (err) {
          res.status(400).send({error: err});
        }
        else if (user === null) {
          res.status(400).send({error: 'This user does not exist'});
        }
        else {
          for (property in req.body) {
            user[property] = req.body[property];
          }
          user.save(
            function (err, updatedUser) {
              if (err) {
                res.status(400).send({error: err});
              }
              else {
                res.json(updatedUser);
              }

            }
          )
        }
      }
    )
  }
);

module.exports = router;
