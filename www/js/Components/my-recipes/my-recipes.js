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
      var vm = this;
      vm.$onInit = onInit;

      function onInit() {
        vm.user = authenticationService.initialCheck()
      }

    }
  })();
