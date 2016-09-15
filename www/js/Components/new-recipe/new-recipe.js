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
    
    //Declaring variables to be used by this controller
    var vm = this;
    vm.recipe = {};
    vm.recipe.ingredients = [];
    
    //Declaring functions to be used by this controller
    vm.$onInit = onInit;
    vm.addIngredient = addIngredient;
    vm.saveRecipe = saveRecipe;


      /**
       * @loghen41 addIngredients() will take a name and quantity and add that ingredient to the ingredients array
       * @param name
       * @param quantity
       */
    function addIngredient(name, quantity) {
        
      //This builds the object that we will push into the vm.recipe.ingredients array
        vm.recipe.ingredients.push({
        name: name,
        quantity: quantity
      });
        
        //This section resets the form variables so they are empty strings after submission
      vm.ingredient = '';
      vm.quantity = '';
    }

    /**
     * This checks with the authenticationService to ensure that the user is still logged in, so we can actually do the work we need to do.
     */
    function onInit() {
      vm.user = authenticationService.initialCheck()
    }

    /**
     * @loghen41 this function requires a recipe to be passed to it, it assumes it will be the vm.recipe object we have been creating to this point
     * @loghen41 the object is then passed to the firebase.js controller, where it saves the recipe on the database
     * @param recipe
       */
    function saveRecipe(recipe) {
      
      //we pass the recipe object to the firebaseService to store the recipe on the database
      firebaseService.saveRecipe(vm.user, recipe);
      
      //We show a toast to the user that displays that the recipe has been created
      toastService.showToast(vm.recipe.title + ' created!');
      
      //We reset the recipe Object to prepare it for a new recipe
      vm.recipe = {};
    }

  }
})();
