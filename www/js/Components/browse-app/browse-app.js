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

      function onInit() {
        
      }

    }
  })();
