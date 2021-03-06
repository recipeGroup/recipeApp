//160928-recipeApp_recipe-detail_js
(function () {
  angular.module('app')
         .component(
           'recipeDetail', {
             bindings: {},
             templateUrl: 'js/Components/recipe-detail/recipe-detail.html',
             controller: recipeDetailController,
             controllerAs: 'vm'
           }
         );
  //to connect to database and draw in selected recipe added authenticationService and recipesService
  function recipeDetailController(recipesService, userService, $state, toastService) {
    //Declare Local variables
    var vm = this;
    //Declare Public variables
    vm.$onInit = onInit;
    vm.addLine = addLine;
    vm.deleteLine = deleteLine;
    vm.goBack = goBack;
    vm.saveRecipe = saveRecipe;
    vm.deleteRecipe = deleteRecipe;


    /**
     * @kazeki1 create the onLoad event in authenticationService and added it to initial check
     * @kazeki1 created the variable selectedRecipe and set it equal to the SelectedRecipe
     */
    function onInit() {
      /**
       * @kazeki1 Day 4, Thu- load selectedRecipe with selected recipe held in recipesService
       */
      vm.selectedRecipe = recipesService.getSelectedRecipe();
    }
    
    
    function addLine() {
                 vm.selectedRecipe.ingredients.push({
                    name: '',
                     quantity: ''
                                                    });
                 
    }
    
    function deleteLine(index) {
         vm.selectedRecipe.ingredients.splice(index, 1);
    }

    /**
     * @tyeren creates the ability to delete and entire recipe from firebase
     * @param recipe
       */
    function deleteRecipe(recipe) {
      recipesService.deleteRecipe(recipe)
        .then(
          function (successResponse) {
            $state.go('tabs.myRecipes');
            toastService.showToast(successResponse);
          },
          function (errorResponse) {
            console.log(errorResponse)
          }
        )
    }

    /**
       * @tyeren allows the user to go back a page in specific areas in the app
     */
    function goBack() {
      $state.go('tabs.myRecipes');
    }

    /**
     * @tyeren allows user to save edits made to user specific recipes
     * @param recipe
       */
    function saveRecipe(recipe) {
      recipesService.updateRecipe(recipe)
                    .then(
                      function (successResponse) {
                        vm.selectedRecipe = successResponse;
                        toastService.showToast('Changes to ' + vm.selectedRecipe.title + ' saved!');
                      },
                      function () {
                      }
                    );
    }
  }


})();





