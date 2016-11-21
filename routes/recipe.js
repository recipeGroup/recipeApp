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
           Recipe.remove({_id: req.body._id}, function(err, recipe) {
             if (err) {
               res.status(400).send({error: err});
             }
             else {
               res.send(req.body.title + " Deleted!");
             }
           })
});

router.get('/read/public', function (req, res, next) {
          Recipe.find({status:"Public"}, function(err, recipes){
            if (err) {
              res.status(400).send({error: err});
            }
            else if (recipes.length === 0) {
              res.status(400).send({error: 'No public recipes exist'});
            }
            else {
              res.json(recipes);
            }
          })
});

router.get('/read/:user', function (req, res, next) {
  Recipe.find({user: req.params.user}, function (err, recipes) {
      if (err) {
        res.status(400).send({error: err});
      }
      else if (recipes.length === 0) {
        res.status(400).send({error: 'No recipes exist for this user'});
      }
      else {
        res.json(recipes);
      }
    }
  )
});

router.post('/update', function (req, res, next) {
  Recipe.findById(
    req.body._id, function (err, recipe) {
      if (err) {
        res.status(400).send({error: err});
      }
      else if (recipe === null) {
        res.status(400).send({error: 'This recipe does not exist'});
      }
      else {
        for (property in req.body) {
          recipe[property] = req.body[property];
        }
        recipe.save(
          function (err, updatedRecipe) {
            if (err) {
              res.status(400).send({error: err});
            }
            else {
              res.json(updatedRecipe);
            }
            
          }
        )
      }
    }
  )
});
module.exports = router;
