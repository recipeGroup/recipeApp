(function() {
  angular.module('app')
    .component(
      'browseApp',{
        bindings: {},
        templateUrl: 'js/Components/browse-app/browse-app.html',
        controller: browseAppController,
        controllerAs: 'vm'
      });
    function browseAppController(recipesService, userService) {
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
  
      }

      function saveToProfile(selectedRecipe) {

      }

      function selectRecipe(recipe) {
        vm.selectedRecipe = recipe;
      }

    }
  })();
