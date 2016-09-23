(function() {
  angular.module('app')
    .component(
      'browseOnline',{
        bindings: {},
        templateUrl: 'js/Components/browse-online/browse-online.html',
        controller: browseOnlineController,
        controllerAs: 'vm'
      });
    function browseOnlineController(apiCallsService) {
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
