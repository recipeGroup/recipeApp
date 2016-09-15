(function() {
  angular.module('app')
    .component(
      'myRecipes',{
        bindings: {},
        templateUrl: 'js/Components/my-recipes/my-recipes.html',
        controller: myRecipesController,
        controllerAs: 'vm'
      });
    function myRecipesController(authenticationService, $state, recipesService) {

      //Declaring Variables for the controller to user
      var vm = this;

      //Tying these functions for the view to have access to use
      vm.$onInit = onInit;
      vm.getRecipes = getRecipes;
      vm.goToThisRecipe = goToThisRecipe;

      function onInit() {
        vm.user = authenticationService.initialCheck();
        getRecipes();
      }

      function getRecipes() {
        recipesService.getRecipes()
          .then(function(successResponse) {
            vm.recipes = successResponse;
          },
          function (errorResponse) {
            console.log(errorResponse);
          });
      }
  
      function goToThisRecipe(recipe) {
        recipesService.setSelectedRecipe(recipe);
        $state.go('tabs.recipeDetail');
      }
    }
    
    
  })();
