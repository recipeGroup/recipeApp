var express = require('express');
var router = express.Router();
var User = require('../models/models.js').User;

router.post('/create', function (req, res, next) {
  User.findOne({email: req.body.email}, function(err, user) {
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
  })
});

//-------------------------------------------------------
router.post('/login', function (req, res, next) {
  }
);
https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4

// ROUTES
// ==============================================
  
  app.route('/login')
     // show the form (GET http://localhost:8080/login)
     .get(
       function (req, res) {
         res.send('this is the login form');
       }
     )
  
     // process the form (POST http://localhost:8080/login)
     .post(
       function (req, res) {
         console.log('processing');
         res.send('processing the login form!');
       }
     );

//-------------------------------------------------------

router.post('/logout', function (req, res, next) {

});

router.get('/read', function (req, res, next) {

});

router.post('/update', function (req, res, next) {

});

module.exports = router;
