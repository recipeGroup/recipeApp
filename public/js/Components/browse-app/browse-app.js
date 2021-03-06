<!-- 160928-recipeApp-browse-app_js -->
(function() {
  angular.module('app')
    .component(
      'browseApp',{
        bindings: {},
        templateUrl: 'js/Components/browse-app/browse-app.html',
        controller: browseAppController,
        controllerAs: 'vm'
      });
    function browseAppController(recipesService, userService, toastService) {
      var vm = this;
      vm.goBack = goBack;
      vm.$onInit = onInit;
      vm.saveToProfile = saveToProfile;
      vm.selectRecipe = selectRecipe;
  
      /**
       * kazeki click on 'browse' button to return to browser - this goBack function erased the recipe screen by making it undefined
       * @type {goBack}
       */
      function goBack() {
        vm.selectedRecipe = undefined;
      }
      function onInit() {
        /**
         * kazeki - onInit evokes recipesService for recipes
         */
        recipesService.readPublicRecipes()
          .then(
            function (successResponse) {
              vm.appRecipes = successResponse;
            },
            function (errorResponse) {
              toastService.showToast(errorResponse);
            });
         }
  
      /**
       * kazeki - save all selections to firebase
       * @param selectedRecipe
       */
      function saveToProfile(selectedRecipe) {
      }
  
      /**
       * kazekl - get recipe from firebase
       * @param recipe
       */
      function selectRecipe(recipe) {
        vm.selectedRecipe = recipe;
      }
    }
  })();
