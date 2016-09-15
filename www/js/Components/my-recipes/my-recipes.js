(function() {
  angular.module('app')
    .component(
      'myRecipes',{
        bindings: {},
        templateUrl: 'js/Components/my-recipes/my-recipes.html',
        controller: myRecipesController,
        controllerAs: 'vm'
      });
    function myRecipesController(authenticationService, firebaseService) {

      //Declaring Variables for the controller to user
      var vm = this;

      //Tying these functions for the view to have access to use
      vm.$onInit = onInit;
      vm.getRecipes = getRecipes;

      function onInit() {
        vm.user = authenticationService.initialCheck();
        getRecipes();
      }

      function getRecipes() {
        firebaseService.getRecipes()
          .then(function(successResponse) {
            vm.recipes = successResponse;
          },
          function (errorResponse) {
            console.log(errorResponse);
          });
      }

    }
  })();
