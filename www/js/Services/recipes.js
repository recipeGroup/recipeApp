(function () {
  angular.module('app')
    .service('recipesService', function ($firebaseObject, $firebaseArray, $q) {

      //Declaring Variables for use in the service
      var ref = firebase.database().ref("recipes");
      var recipesRef = $firebaseArray(ref);
      var selectedRecipe;

      //Declaring functions for use in the Controller
      this.editRecipe = editRecipe;
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
        var record = {
          title: recipe.title,
          directions: recipe.directions,
          public: false,
          user: user.uid
        };

        recipesRef.$add(record)
          .then(
            function (successResponse) {
              var newRef = firebase.database().ref("recipes").child(successResponse.key).child('ingredients');
              var ingredientsRef = $firebaseArray(newRef);
              for (var i = 0; i < recipe.ingredients.length; i++) {
                ingredientsRef.$add(recipe.ingredients[i]);
              }
            },
            function (error) {
              console.log(error)
            })
      }

      function editRecipe(user, recipe) {
        var record = {
          title: recipe.title,
          ingredients: recipe.ingredients,
          directions: recipe.directions,
          user: user.uid
        };
        ref.child(recipe.$id).set(record);
      }

      function getRecipes(userId) {
        var promise = $q.defer();
        var newRef = firebase.database().ref("recipes").orderByChild('user').equalTo(userId);
        var userRecipes = $firebaseArray(newRef);
        userRecipes.$loaded(
          function(successResponse)
          {
            promise.resolve(successResponse);
          },
          function(errorResponse)
          {
            promise.reject(errorResponse);
          });
        return promise.promise;
      }

    })
})();
