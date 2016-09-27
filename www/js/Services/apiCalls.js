(function () {
  angular.module('app')
    .service('apiCallsService', function ($http, $q) {
      this.browseRecipes = browseRecipes;
      this.getRecipe = getRecipe;

      function browseRecipes(pageNumber) {
        var promise = $q.defer();
        $http({
          method: 'GET',
          url: 'http://food2fork.com/api/search',
          params: {
            key: '70b859c8408ff3d711daad538ff406cd',
            page: pageNumber
          }

        })
          .then( function (sucessResponse) {
            promise.resolve(sucessResponse.data.recipes);
          }, function (errorResponse) {
            console.log(errorResponse);
          });
        return promise.promise;
      }

      function getRecipe(recipeId) {
        var promise = $q.defer();
        
        $http ({
          method: 'GET',
          url: 'http://food2fork.com/api/get',
            params: {
            key: '70b859c8408ff3d711daad538ff406cd',
            rId: recipeId
          }
        })
          .then(
            function (successResponse) {
              promise.resolve(successResponse.data)
            },function (errorResponse) {
              promise.reject(errorResponse.data)
        }
          );
        return promise.promise
      }

    });
})();
