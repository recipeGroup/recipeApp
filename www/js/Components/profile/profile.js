// 160922-0800_recipeApp_our-profile_js
(function () {
  angular.module('app')
    .component(
      'profile', {
        bindings: {},
        templateUrl: 'js/Components/profile/profile.html',
        controller: profileController,
        controllerAs: 'vm'
      });

  function profileController(userService, toastService, $scope) {
    var vm = this;
    vm.$onInit = onInit;
    vm.saveProfile = saveProfile;

    function onInit () {
      userService.getProfile()
        .then(
          function (successResponse) {
            vm.data = successResponse;
          },
          function (errorResponse) {
            console.log(errorResponse);
          });
    }

    function saveProfile (user) {
      userService.saveProfile(user);
      toastService.showToast(user.displayName + 'profiled saved!');
    }
  }
})();
