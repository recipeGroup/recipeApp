(function() {
  angular.module('app')
    .component(
      'tabs',{
        bindings: {},
        templateUrl: 'js/Components/tabs/tabs.html',
        controller: tabsController,
        controllerAs: 'vm'
      });
    function tabsController(authenticationService) {
      var vm = this;
      vm.$onInit = onInit;

      function onInit() {
        vm.user = authenticationService.initialCheck()
      }

    }
  })();
