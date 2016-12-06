<!-- 160928-recipeApp-browse_js -->
(function () {
  angular.module('app')
         .component(
           'browse', {
             bindings: {},
             templateUrl: 'js/Components/browse/browse.html',
             controller: browseController,
             controllerAs: 'vm'
           }
         );
  /**
   * kazeki create service to get user profile info for setting up avatar and username display
   * @param userService
   */
  function browseController(userService) {
    var vm = this;
    vm.$onInit = onInit;
    
    function onInit() {
     
    }
    
  }
  
})();
