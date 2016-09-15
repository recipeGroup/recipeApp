(function() {
  angular.module('app')
    .component(
      'recipeDetail',{
        bindings: {},
        templateUrl: 'js/Components/recipe-detail/recipe-detail.html',
        controller: recipeDetailController,
        controllerAs: 'vm'
      });
  //to connect to database and draw in selected recipe added authenticationService and recipesService
    function recipeDetailController(authenticationService, recipesService) {
      var vm = this;
      vm.$onInit = onInit;
      
      /**
       * @kazeki1 create the onLoad event in authenticationService and added it to initial check
       * @kazeki1 created the variable selectedRecipe and set it equal to the SelectedRecipe
        */
      function onInit() {
        vm.user = authenticationService.initialCheck();
        vm.selectedRecipe = recipesService.getSelectedRecipe();
      }
       
    }
  })();
