(function() {
  angular.module('app')
    .component(
      'newRecipe',{
        bindings: {},
        templateUrl: 'js/Components/new-recipe/new-recipe.html',
        controller: newRecipeController,
        controllerAs: 'vm'
      });
    function newRecipeController(authenticationService, firebaseService) {
      var vm = this;
      vm.$onInit = onInit;

      function onInit() {
        vm.user = authenticationService.initialCheck()
      }

    }
  })();
