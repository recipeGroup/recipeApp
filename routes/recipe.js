var express = require('express');
var router = express.Router();
var Recipe = require('../models/models.js').Recipe;

router.post('/create', function (req, res, next) {
  Recipe.create(
    req.body, function (theerr, therecipe) {
      if (theerr) {
        res.status(400).send({error: theerr});
      }
      else {
        res.json(therecipe);
      }
    }
  )
});

router.post('/delete', function (req, res, next) {

});

router.get('/read/public', function (req, res, next) {

});

router.get('/read/:userId', function (req, res, next) {

});

router.post('/update', function (req, res, next) {

});
