(function() {
  angular.module('app')
    .component(
      'tabs',{
        bindings: {},
        templateUrl: 'js/Components/tabs/tabs.html',
        controller: tabsController,
        controllerAs: 'vm'
      });
    function tabsController(userService) {
      var vm = this;
      vm.$onInit = onInit;

      function onInit() {
        userService.onUpdate(updateUser.bind(vm));
      }
      
      function updateUser(user) {
        this.user = user;
      }

    }
  })();
