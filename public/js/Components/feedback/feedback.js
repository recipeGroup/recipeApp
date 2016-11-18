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
