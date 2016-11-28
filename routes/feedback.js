var express = require('express');
var router = express.Router();
var Feedback = require('../models/models.js').Feedback;

router.post('/create', function (req, res, next) {
  Feedback.create(req.body, function (err, feedback) {
    if(err) {
      res.status(404).send({ error: err });
    }
    else {
      res.send(feedback);
    }
  });
});

module.exports = router;

