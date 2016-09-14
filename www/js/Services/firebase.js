(function () {
  angular.module('app')
    .service('firebaseService', function ($firebaseObject, $firebaseArray, $q, authenticationService) {

      var user = authenticationService.initialCheck();
      this.saveRecipe = saveRecipe;
      var ref = firebase.database().ref("recipes");
      var recipesRef = $firebaseArray(ref);

      function saveRecipe(recipe) {
        recipesRef.$add({
          user: user.uid,
          title: recipe.title,
          ingredients: recipe.ingredients,
          directions: recipe.directions
        });
      }

    })
})();
