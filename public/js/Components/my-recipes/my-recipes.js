(function() {
  angular.module('app')
    .component(
      'myRecipes',{
        bindings: {},
        templateUrl: 'js/Components/my-recipes/my-recipes.html',
        controller: myRecipesController,
        controllerAs: 'vm'
      });
    function myRecipesController($state, recipesService, userService, toastService) {

      //Declaring Variables for the controller to user
      var vm = this;

      //Tying these functions for the view to have access to use
      vm.$onInit = onInit;
      vm.readUserRecipes = readUserRecipes;
      /**
       * @kazeki1 Day 4, Thu- establish global var to hold recipe from function goToThisRecipe
       * @type {goToThisRecipe}
       */
      vm.goToThisRecipe = goToThisRecipe;

      function onInit() {
        vm.user = userService.getUser();
        /**
         * @kazeki1 Day 4, Thu - if authentication passes call getRecipes
         */
        readUserRecipes(vm.user.email);
      }

      /**
       * @tyeren gets user specific created recipes to display
       * @param userId
         */
      function readUserRecipes(userId) {

        recipesService.readUserRecipes(userId)
          .then(function(successResponse) {
            vm.recipes = successResponse;
          },
          function (errorResponse) {
            toastService.showToast(errorResponse);
          });
      }

      /**
       * @tyeren changes view to users selected recipe
       * @param recipe
         */
      function goToThisRecipe(recipe) {
        //Day 4, Thu- connect recipe values to recipesService
        recipesService.setSelectedRecipe(recipe);

        //Day 4, Thu-  change state to recipe-detail page
        $state.go('tabs.recipeDetail');
      }
    }

  })();
