(function() {
  angular.module('app')
    .component(
      'browse',{
        bindings: {},
        templateUrl: 'js/Components/browse/browse.html',
        controller: browseController,
        controllerAs: 'vm'
      });
    function browseController(apiCallsService) {
      var vm = this;
      vm.$onInit = onInit;

      function onInit() {
        apiCallsService.browseRecipes().then(
          function (sucessResponse) {
            vm.recipes = sucessResponse;
            console.log(vm.recipes);
          }, function (errorResponse) {

        }
        )
      }

    }
  })();
