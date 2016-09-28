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
    var vm = this;
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
  
    userService.getProfile()
               .then(
                 function (successResponse) {
                   vm.user = successResponse;
                   var str = vm.user.email;
                   if (vm.user.displayName == null) {
                     var aNum;
                     aNum = str.indexOf("@");
                     vm.displayName = str.substr(0, aNum);
                   }
                   else {
                     vm.displayName = vm.user.displayName;
                   }
      
                 },
                 function (errorResponse) {
      
                 }
               );
  
  
    function saveRecipe(recipe) {
      recipesService.editRecipe(recipe)
                    .then(
                      function (successResponse) {
                        vm.selectedRecipe.ingredients = successResponse;
                        toastService.showToast('Changes to ' + vm.selectedRecipe.title + ' saved!');
                      },
                      function () {
                      }
                    );
    }

    function goBack() {
      $state.go('tabs.myRecipes');
    }

    function addLine() {
      recipesService.addIngredient(vm.selectedRecipe)
                    .then(
                      function (successResponse) {
                        vm.selectedRecipe.ingredients = successResponse;
                      },
                      function (errorResponse) {
                        console.log(errorResponse);
                      }
                    );

    }

    function deleteLine(index) {
      recipesService.deleteIngredient(vm.selectedRecipe, index)
                    .then(
                      function (successResponse) {
                        vm.selectedRecipe.ingredients = successResponse;
                      },
                      function (errorResponse) {
                        console.log(errorResponse);
                      }
                    );
    }

    function deleteRecipe(recipe) {
      recipesService.deleteRecipe(recipe)
        .then(
          function (successResponse) {
            $state.go('tabs.myRecipes');
            console.log(successResponse)
          },
          function (errorResponse) {
            console.log(errorResponse)
          }
        )
    }
  }


})();





