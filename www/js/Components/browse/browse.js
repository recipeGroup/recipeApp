(function() {
  angular.module('app')
    .component(
      'browse',{
        bindings: {},
        templateUrl: 'js/Components/browse/browse.html',
        controller: browseController,
        controllerAs: 'vm'
      });
    function browseController(userService) {
      var vm = this;
      vm.$onInit = onInit;

      function onInit() {
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

    }
  })();
