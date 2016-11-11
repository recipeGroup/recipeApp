(function () {
  angular.module('app')
    .component(
      'feedback', {
        bindings: {},
        templateUrl: 'js/Components/feedback/feedback.html',
        controller: feedbackController,
        controllerAs: 'vm'
      });
  function feedbackController( toastService, $state, userService) {
    //Local variables
    var vm = this;
    //Public variables
    vm.$onInit = onInit;
    vm.saveFeedback = saveFeedback;
    /**
       * @tyeren gets user profile/ID to display users email or profile name
     */
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

    /**
     * @tyeren saves user created feedback (text feedback and/or 1-5 rating) to firebase
     * @param feedback
       */
    function saveFeedback(feedback) {
      if (!feedback.rating) {
        toastService.showToast('Please Select A rating for our App!');
      }
      else {
      }
    }
  }

})();
