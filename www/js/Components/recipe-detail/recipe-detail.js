(function () {
  angular.module('app')
    .component(
      'recipeDetail', {
        bindings: {},
        templateUrl: 'js/Components/recipe-detail/recipe-detail.html',
        controller: recipeDetailController,
        controllerAs: 'vm'
      });
  //to connect to database and draw in selected recipe added authenticationService and recipesService
  function recipeDetailController(authenticationService, recipesService, $state, toastService) {
    var vm = this;
    vm.$onInit = onInit;
    vm.addLine = addLine;
    vm.deleteLine = deleteLine;
    vm.goBack = goBack;
    vm.saveRecipe = saveRecipe;

    /**
     * @kazeki1 create the onLoad event in authenticationService and added it to initial check
     * @kazeki1 created the variable selectedRecipe and set it equal to the SelectedRecipe
     */
    function onInit() {
      vm.user = authenticationService.initialCheck();
      /**
       * @kazeki1 Day 4, Thu- load selectedRecipe with selected recipe held in recipesService
       */
      vm.selectedRecipe = recipesService.getSelectedRecipe();
    }

    function saveRecipe(recipe) {
      console.log(recipe);
      recipesService.editRecipe(recipe)
        .then(
          function () {
            toastService.showToast('Changes to ' + vm.selectedRecipe.title + ' saved!');
          },
          function () {
          });
    }

    function goBack() {
      $state.go('tabs.myRecipes');
    }

    function addLine() {
        var newIngredient = {
          name: '',
          quantity: ''
        };
      vm.selectedRecipe.ingredients.$add(newIngredient)
        .then(
          function () {
          recipesService.redefineArray(vm.selectedRecipe.$id)
            .then(
              function(successResponse) {
                vm.selectedRecipe.ingredients = successResponse;
              },
              function() {}
            )
          },
          function () {}
        )

    }

    function deleteLine(ingredient) {
      vm.selectedRecipe.ingredients.$remove(ingredient)
        .then(
          function () {
            recipesService.redefineArray(vm.selectedRecipe.$id)
              .then(
                function(successResponse) {
                  vm.selectedRecipe.ingredients = successResponse;
                  console.log(successResponse);
                },
                function() {}
              )
          },
          function () {}
        )
    }

  }
})();





