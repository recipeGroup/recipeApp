//160928-recipeApp_Services_recipes_js
(function () {
  angular.module('app')
    .service('recipesService', function ( $http, $q) {

      //Declaring Variables for use in the service
      var selectedRecipe;

      //Declaring functions for use in the Controller
      this.updateRecipe = updateRecipe;
      this.readPublicRecipes = readPublicRecipes;
      this.readUserRecipes = readUserRecipes;
      this.getSelectedRecipe = getSelectedRecipe;
      this.createRecipe = createRecipe;
      this.setSelectedRecipe = setSelectedRecipe;
      this.deleteRecipe = deleteRecipe;

      function deleteRecipe(recipe) {
        var promise = $q.defer();
       
        return promise.promise;
      }


      function updateRecipe(recipe) {
        //$q makes a promise object that waits for a resolve, or a reject
        var promise = $q.defer();

        //var record is a local object that has been prepared to make an update to the database
        var record = {
          title: recipe.title,
          directions: recipe.directions,
          status: recipe.status
        };
        
        return promise.promise;

      }


      function readPublicRecipes() {
        var promise = $q.defer();
        
        return promise.promise;
      }

      function readUserRecipes(userId) {
        var promise = $q.defer();
       
        return promise.promise;
      }


      /**
       * @loghen41 allows the controller to get the selectedRecipe variable in the service
       * @returns {*}
       */
      function getSelectedRecipe() {
        return selectedRecipe;
      }
      

      function createRecipe(recipe) {
        var promise = $q.defer();
        $http(
          {
            method: 'POST',
            url: '/recipe/create',
            data: recipe
          }
        )
          .then(
            function (success) {
              setSelectedRecipe(success.data);
              promise.resolve();
            }, function (error) {
              promise.reject(error.data.error);
            }
          );
        return promise.promise;
      }

      /**
       * @loghen41 allows a controller to set the selectedRecipe variable in the service for other controllers to see
       * @param recipe
       */
      function setSelectedRecipe(recipe) {
        selectedRecipe = recipe;
      }
    })
})();

