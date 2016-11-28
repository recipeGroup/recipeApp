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
        $http(
          {
            method: 'POST',
            url: '/recipe/delete',
            data: recipe
          }
        )
          .then(
            function (successResponse) {
              promise.resolve(successResponse.data);
            },
            function (errorResponse) {
              promise.reject(errorResponse.data.error);
      
            }
          );
        return promise.promise;
      }


      function updateRecipe(recipe) {
        var promise = $q.defer();
        $http(
          {
            method: 'POST',
            url: '/recipe/update',
            data: recipe
          }
        )
          .then(
            function (successResponse) {
              promise.resolve(successResponse.data);
            },
            function (errorResponse) {
              promise.reject(errorResponse.data.error);
      
            }
          );
        return promise.promise;

      }


      function readPublicRecipes() {
        var promise = $q.defer();
        $http(
          {
            method: 'GET',
            url: '/recipe/public'
          }
        )
          .then(
            function (successResponse) {
              promise.resolve(successResponse.data);
            },
            function (errorResponse) {
              promise.reject(errorResponse.data.error);
      
            }
          );
        return promise.promise;
      }

      function readUserRecipes(userId) {
        var promise = $q.defer();
        $http(
          {
            method: 'GET',
            url: '/recipe/read/' + userId
          }
        )
          .then(
            function (successResponse) {
                  promise.resolve(successResponse.data);
            },
            function (errorResponse) {
                  promise.reject(errorResponse.data.error);
              
            }
          );
       
        return promise.promise;
      }
      
      ////////////
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
              promise.resolve(success.data);
            }, function (error) {
              promise.reject(error.data.error);
            }
          );
        return promise.promise;
      }
      
      function setSelectedRecipe(recipe) {
        selectedRecipe = recipe;
      }
      //////////////
    })
})();

