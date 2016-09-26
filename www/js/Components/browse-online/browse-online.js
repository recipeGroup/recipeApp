(function() {
  angular.module('app')
    .component(
      'browseOnline',{
        bindings: {},
        templateUrl: 'js/Components/browse-online/browse-online.html',
        controller: browseOnlineController,
        controllerAs: 'vm'
      });
    function browseOnlineController(apiCallsService) {
      var vm = this;
      vm.$onInit = onInit;
      vm.onlineDetails = onlineDetails;
      vm.goBack = goBack;

      function goBack() {
        vm.selectedRecipe = undefined;
      }

      function onlineDetails(recipeId) {
        apiCallsService.getRecipe(recipeId)
          .then( function (successResponse) {
            console.log(successResponse);
            vm.selectedRecipe = successResponse.recipe;
          }, function (errorResponse) {
            console.log(errorResponse)

        })
      }

      function onInit() {
        apiCallsService.browseRecipes().then(
          function (sucessResponse) {
            vm.recipes = sucessResponse;
            console.log(vm.recipes);
          }, function (errorResponse) {

        }
        )
      }

    }
  })();
