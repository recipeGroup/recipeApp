(function() {
  angular.module('app')
    .component(
      'home',{
        bindings: {},
        templateUrl: 'js/home/home.html',
        controller: homeController,
        controllerAs: 'vm'
      });
    function homeController() {
      
    }
  })();
