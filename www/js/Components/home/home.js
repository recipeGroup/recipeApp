(function() {
  angular.module('app')
    .component(
      'home',{
        bindings: {},
        templateUrl: 'js/Components/home/home.html',
        controller: homeController,
        controllerAs: 'vm'
      });
    function homeController(authenticationService) {
      var vm = this;
      vm.$onInit = onInit;

      function onInit() {
        vm.user = authenticationService.initialCheck()
      }

    }
  })();
