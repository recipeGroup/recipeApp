//160928-recipeApp_Comp_tabs_js
(function() {
  angular.module('app')
    .component(
      'tabs',{
        bindings: {},
        templateUrl: 'js/Components/tabs/tabs.html',
        controller: tabsController,
        controllerAs: 'vm'
      });

  function tabsController(userService, $rootScope, $state) {
    //Declaring Local Variables
    var vm = this;

    //Declaring Public Variables
    vm.$onInit = onInit;

    /**
     *@tyeren update the user thru out the app so we can call the user
     */
    function onInit() {
      userService.onUpdate(updateUser.bind(vm));
      vm.header = $state.current.displayName;
    }

    /**
     * updates user
     * @param user
     */
    function updateUser(user) {
      this.user = user;
    }

    $rootScope.$on('$stateChangeSuccess',
      function (event, toState, toParams, fromState, fromParams) {
        vm.header = toState.displayName;
      });

  }
})();
