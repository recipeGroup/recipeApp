/**
 * Created by kazeki on 16/11/10.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
  }
);

module.exports = router;
