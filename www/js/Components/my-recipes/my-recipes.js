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
      /**
       * @kazeki1 Day 4, Thu- establish global var to hold recipe from function goToThisRecipe
       * @type {goToThisRecipe}
       */
      vm.goToThisRecipe = goToThisRecipe;

      function onInit() {
        vm.user = authenticationService.initialCheck();
        /**
         * @kazeki1 Day 4, Thu - if authentication passes call getRecipes
         */
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
        //Day 4, Thu- connect recipe values to recipesService
        recipesService.setSelectedRecipe(recipe);

        //Day 4, Thu-  change state to recipe-detail page
        $state.go('tabs.recipeDetail');
      }
    }

  })();
