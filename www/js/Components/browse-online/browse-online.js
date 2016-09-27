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
      vm.nextPage = nextPage;
      vm.previousPage = previousPage;
      var pageNumber = 1;

      function goBack() {
        vm.selectedRecipe = undefined;
      }

      function nextPage() {
        pageNumber = pageNumber + 1;
        vm.recipes = [];
        apiCall(pageNumber);
      }

      function previousPage() {
        if (pageNumber > 1) {
          pageNumber = pageNumber - 1;
          vm.recipes = [];
        }
        apiCall(pageNumber);
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

      function apiCall(pageNumber) {
        apiCallsService.browseRecipes(pageNumber).then(
          function (sucessResponse) {
            vm.recipes = sucessResponse;
            console.log(vm.recipes);
          }, function (errorResponse) {

          }
        )
      }

      function onInit() {
        apiCall(pageNumber);
      }

    }
  })();
