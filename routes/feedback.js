var express = require('express');
var router = express.Router();
var Feedback = require('../models/models.js').Feedback;

router.post('/create', function (req, res, next) {
  Feedback.create(
    req.body, function (err, feedback) {
      if (err) {
        res.status(400).send({error: err});
      }
      else {
        res.json(feedback);
      }
    }
  )
});

module.exports = router;

