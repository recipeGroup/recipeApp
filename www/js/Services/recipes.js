(function () {
  angular.module('app')
    .service('recipesService', function ($firebaseObject, $firebaseArray, $q) {

      //Declaring Variables for use in the service
      var ref = firebase.database().ref("recipes");
      var recipesRef = $firebaseArray(ref);
      var selectedRecipe;
      
      //Declaring functions for use in the Controller
      this.saveRecipe = saveRecipe;
      this.getRecipes = getRecipes;
      this.setSelectedRecipe = setSelectedRecipe;
      this.getSelectedRecipe = getSelectedRecipe;

      function setSelectedRecipe(recipe) {
          selectedRecipe = recipe;
      }
      
      function getSelectedRecipe() {
               return selectedRecipe;
      }
      
      /**
       * @loghen41 saveRecipe() expects a user object and a recipe object, which should have a title, ingredients, and directions
       * @param user
       * @param recipe
       */
      function saveRecipe(user, recipe) {
        recipesRef.$add({
          user: user.uid,
          title: recipe.title,
          ingredients: recipe.ingredients,
          directions: recipe.directions
        });
      }

      function getRecipes () {
        var promise = $q.defer();
        recipesRef.$loaded(function() {
            promise.resolve(recipesRef)
        },
          function(errorResponse) {
            promise.reject(errorResponse);
          });
        
        return promise.promise;
      }

    })
})();
