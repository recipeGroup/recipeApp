(function() {
  angular.module('app')
    .component(
      'browseApp',{
        bindings: {},
        templateUrl: 'js/Components/browse-app/browse-app.html',
        controller: browseAppController,
        controllerAs: 'vm'
      });
    function browseAppController(recipesService) {
      var vm = this;
      vm.$onInit = onInit;
      vm.selectRecipe = selectRecipe;
      vm.saveToProfile = saveToProfile;
      vm.goBack = goBack;

      function goBack() {
        vm.selectedRecipe = undefined;
      }

      function onInit() {
        recipesService.getAppRecipes()
          .then(
            function (successResponse) {
              vm.appRecipes = successResponse;
            },
            function (errorResponse) {
              console.log(errorResponse);
            });
      }

      function saveToProfile(selectedRecipe) {

      }

      function selectRecipe(recipe) {
        vm.selectedRecipe = recipe;
      }

    }
  })();
