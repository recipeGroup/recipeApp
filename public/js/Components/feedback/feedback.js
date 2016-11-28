(function () {
  angular.module('app')
    .component(
      'feedback', {
        bindings: {},
        templateUrl: 'js/Components/feedback/feedback.html',
        controller: feedbackController,
        controllerAs: 'vm'
      });
  function feedbackController(toastService, $http) {
    //Local variables
    var vm = this;
    //Public variables
    vm.$onInit = onInit;
    vm.saveFeedback = saveFeedback;

    function onInit() {

    }

    /**
     * @tyeren saves user created feedback (text feedback and/or 1-5 rating) to firebase
     * @param feedback
       */
    function saveFeedback(feedback) {
      $http({
        method: 'POST',
        url: '/feedback/add',
        data: feedback
      })
        .then(
          function () {
            toastService.showToast('Feedback Submitted!');
          },
          function (errorResponse) {
            toastService.showToast(errorResponse.data.error);
          });
    }
  }

})();
