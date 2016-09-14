(function () {
  angular.module('app')
    .component(
      'newRecipe', {
        bindings: {},
        templateUrl: 'js/Components/new-recipe/new-recipe.html',
        controller: newRecipeController,
        controllerAs: 'vm'
      });
  function newRecipeController(authenticationService, firebaseService, toastService) {
    var vm = this;
    vm.$onInit = onInit;
    vm.addIngredient = addIngredient;
    vm.saveRecipe = saveRecipe;
    vm.recipe = {};
    vm.recipe.ingredients = [];

    function addIngredient(name, quantity) {
      vm.recipe.ingredients.push({
        name: name,
        quantity: quantity
      });
      vm.ingredient = '';
      vm.quantity = '';
    }

    function onInit() {
      vm.user = authenticationService.initialCheck()
    }

    function saveRecipe(recipe) {
      firebaseService.saveRecipe(recipe);
      toastService.showToast(vm.recipe.title + ' created!');
      vm.recipe = {};
    }



  }
})();
